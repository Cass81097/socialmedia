import { AppDataSource } from "../data-source";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SECRET } from "../middleware/jwt";
import {Like} from "../entity/like";
export class LikeService {
    private likeRepository;

    constructor() {
        this.likeRepository = AppDataSource.getRepository( Like )
    }

    getLikeForStatus = async (id) => {
        try {
            const likeRecords  =  await this.likeRepository.find({
                where : {
                    status : {
                        id : id
                    }
                },
                relations : {
                    user : true
                }
            })

            const likeCount = likeRecords.length
            return { likeRecords , likeCount }
        }catch (e){
            console.log(e)
        }
    }

    save = async  (statusId, userId ) => {
        try {
            const newLike = this.likeRepository.create({
                status: { id: statusId },
                user: { id: userId }
            });

            return await this.likeRepository.save(newLike);
        }
        catch (e){
            console.log(e)
        }
    }
    delete = async (statusId , userId) => {
        try {

            const likeToDelete = await this.likeRepository.findOne({ where: { status: { id: statusId }, user: { id: userId } } });

            if (!likeToDelete) {
                // Nếu không tìm thấy like, bạn có thể xử lý lỗi hoặc trả về một thông báo phù hợp.
                return null; // hoặc throw Error("Không tìm thấy like để xóa");
            }

            const del = await this.likeRepository.delete(likeToDelete);
            return del
        }
        catch (e){
            console.log(e)
            throw e
        }
    }

    update = async (id, user) => {
        try {
            return await this.likeRepository.update(id, user);
        } catch (error) {
            throw new Error('Error updating user');
        }
    }
}

export default new LikeService()