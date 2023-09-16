import { AppDataSource } from "../data-source";
import { User } from "../entity/user";
import { Status } from "../entity/status";
import imageService from "./imageStatusService"
import likeService from "./likeService";
import { Like } from "typeorm";

export class StatusService {
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
                receiver: true,
                sender: true
            }
        });

        for (let i = 0; i < status.length; i++) {
            let imageByStatusId = await imageService.findAllByStatusId(status[i].id);
            let likeByStatusId = await likeService.getLikeForStatus(status[i].id)
            console.log(imageByStatusId, 11111)
            status[i] = await { ...status[i], image: [...imageByStatusId], acountLike: likeByStatusId.likeCount };
        }

        return status;
    };

    findStatusByIdUser = async (senderId, receiverId) => {
        let status = await this.statusRepository.find({
            relations: {
                receiver: true,
                sender: true
            },
            where: {
                sender: {
                    id: senderId
                },
                receiver: {
                    id: receiverId
                }
            }
        });

        for (let i = 0; i < status.length; i++) {
            let imageByStatusId = await imageService.findAllByStatusId(status[i].id);
            let likeByStatusId = await likeService.getLikeForStatus(status[i].id);
            status[i] = {
                ...status[i],
                image: [...imageByStatusId],
                acountLike: likeByStatusId.likeCount,
                listUserLike: [...likeByStatusId.listUserLike]
            };
        }

        return status;
    };

    findByIdUser = async (id) => {
        let status = await this.statusRepository.find({
            relations: {
                receiver: true,
                sender: true
            },
            where: {
                receiver: {
                    id: id
                }
            },
            order: {
                time: 'DESC' // Sắp xếp theo trường 'createdAt' theo thứ tự giảm dần (DESC)
            }
        });
    
        for (let i = 0; i < status.length; i++) {
            let imageByStatusId = await imageService.findAllByStatusId(status[i].id);
            let likeByStatusId = await likeService.getLikeForStatus(status[i].id);
            console.log(likeByStatusId.listUserLike, 111111);
    
            status[i] = {
                ...status[i],
                image: [...imageByStatusId],
                acountLike: likeByStatusId.likeCount,
                listUserLike: [...likeByStatusId.listUserLike]
            };
        }
    
        return status;
    };

    findByIdAndStatus = async (id) => {
        let status = await this.statusRepository.find({
            relations: {
                receiver: true,
                sender: true
            },
            where: {
                receiver: {
                    id: id
                },
                visibility: "public"
            }
        });
        console.log(status, 111)

        for (let i = 0; i < status.length; i++) {
            let imageByStatusId = await imageService.findAllByStatusId(status[i].id);
            let likeByStatusId = await likeService.getLikeForStatus(status[i].id)
            console.log(likeByStatusId.listUserLike, 111111)
            status[i] = await { ...status[i], image: [...imageByStatusId], acountLike: likeByStatusId.likeCount, listUserLike: [...likeByStatusId.listUserLike] };
        }

        return status
    };


    delete = async (statusId) => {

        try {
            await this.statusRepository.createQueryBuilder()
                .delete().from("like") // Thay thế "like" bằng tên bảng thực tế của bạn
                .where("statusId = :statusId", { statusId })
                .execute();
            await this.statusRepository.createQueryBuilder()
                .delete()
                .from("image") // Thay thế "like" bằng tên bảng thực tế của bạn
                .where("statusId = :statusId", { statusId })
                .execute();



            // Xóa bài viết (status) cùng với các dòng liên quan trong bảng Like và ImageStatus
            await this.statusRepository.createQueryBuilder()
                .delete()
                .from("status")
                .where("id = :statusId", { statusId })
                .execute();
            return "xoá thành  công";
        } catch (error) {
            console.error('Lỗi khi xóa bài viết:', error.message);
            throw error;
        }
    }
    updateVisibility = async (statusId, visibility) => {
        try {
            const status = this.statusRepository.find({
                relations: {
                    receiver: true,
                    sender: true
                },
                where: {
                    id: statusId
                }
            });
            if (!status) {
                throw new Error('User not found');
            }

            status.visibility = visibility;
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
                    receiver: true,
                    sender: true
                },
                where: {
                    id: statusId
                }
            });
            if (!status) {
                throw new Error('User not found');
            }

            status.content = content;
            await this.statusRepository.update(statusId, { content: content });
            return "Thay Noi dung Status thành công";
        } catch (error) {
            throw new Error('Error updating content');
        }
    }
    findByContent = async (id, content) => {
        console.log(id, content, 111)
        try {
            return await this.statusRepository.find({
                relations: {
                    receiver: true,
                    sender: true
                },
                where: {
                    content: Like(`%${content}%`),
                    sender: { id: id }
                }
            });
        } catch (error) {
            throw new Error('Error finding user by name');
        }
    }


}
export default new StatusService()