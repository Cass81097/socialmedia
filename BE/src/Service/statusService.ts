import {AppDataSource} from "../data-source";
import {User} from "../entity/user";
import {Status} from "../entity/status";
import imageService from "./imageService";
import likeService from "./likeService";

export  class StatusService {
    private statusRepository;

    constructor() {
        this.statusRepository = AppDataSource.getRepository(Status)
    }

    add = async (status) => {
        return await this.statusRepository.save(status)
    }
    findAll = async () => {
        let status = await this.statusRepository.find({
            relations: {
                user: true
            }
        });

       for (let i = 0; i < status.length; i++) {
            let imageByStatusId = await imageService.findAllByStatusId(status[i].id);
            let likeByStatusId =await likeService.getLikeForStatus(status[i].id)
            console.log( imageByStatusId,11111)
            status[i] = await { ...status[i], image: [...imageByStatusId], acountLike: likeByStatusId.likeCount };
        }

        return status;
    };
    findByIdUser =async (id) => {
        let status = await this.statusRepository.find({
            relations: {
                user: true
            },
            where :{
                user:{
                    id:id
                }
            }
        });

        for (let i = 0; i < status.length; i++) {
            let imageByStatusId = await imageService.findAllByStatusId(status[i].id);
            let likeByStatusId =await likeService.getLikeForStatus(status[i].id)
            console.log( imageByStatusId,11111)
            status[i] = await { ...status[i], image: [...imageByStatusId], acountLike: likeByStatusId.likeCount };
        }

        return status;
    };

    delete = async (statusId) => {

        try {
        await this.statusRepository.createQueryBuilder()
            .delete()
            .from("like") // Thay thế "like" bằng tên bảng thực tế của bạn
            .where("statusId = :statusId", { statusId })
            .execute();



            // Xóa bài viết (status) cùng với các dòng liên quan trong bảng Like và Image
             await this.statusRepository.createQueryBuilder()
                .delete()
                .from("status")
                .where("id = :statusId", { statusId })
                .execute();

        } catch (error) {
            console.error('Lỗi khi xóa bài viết:', error.message);
            throw error;
        }
    }
    updateVisibility = async (statusId, visibility) => {
        try {
            const status = this.statusRepository.find({
                relations: {
                    user: true
                },
                where: {
                    id: statusId
                }
            });
            if (!status ) {
                throw new Error('User not found');
            }

            status .visibility = visibility;
            await this.statusRepository.update(statusId, { visibility: visibility });
            return "Thay trạng thái thành công";
        } catch (error) {
            throw new Error('Error updating trạng thái');
        }
    }
    updateContent = async (statusId, content) => {
        try {
            const status = this.statusRepository.find({
                relations: {
                    user: true
                },
                where: {
                    id: statusId
                }
            });
            if (!status ) {
                throw new Error('User not found');
            }

            status .content = content;
            await this.statusRepository.update(statusId, { content: content });
            return "Thay Noi dung Status thành công";
        } catch (error) {
            throw new Error('Error updating content');
        }
    }


}
export default new StatusService()
