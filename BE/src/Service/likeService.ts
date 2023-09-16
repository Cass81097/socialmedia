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
            let listUserLike=[]
            for (let i = 0; i < likeRecords.length; i++) {

                listUserLike.push(likeRecords[i].user.username)
            }
            return { listUserLike , likeCount }
        }catch (e){
            console.log(e)
        }
    }

    save = async  (data) => {
        return await  this.likeRepository.save(data)
    }
    delete = async (statusId ) => {
            return await this.likeRepository.delete(statusId)
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