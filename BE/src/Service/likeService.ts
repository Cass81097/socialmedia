import { AppDataSource } from "../data-source";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SECRET } from "../middleware/jwt";
import { Like } from "typeorm";

export class LikeService {
    private likeRepository;

    constructor() {
        this.likeRepository = AppDataSource.getRepository(Like)
    }

    getLikeForStatus = async (id) => {
        try {
            const listUsers =  await this.likeRepository.find({
                where : {
                    status : {
                        id : id
                    }
                }
            })
            const likeCount = listUsers.length
            return { listUsers , likeCount }
        }catch (e){
            console.log(e)
        }
    }

    save = async  (idUser, idStatus) => {
        try {
            return await this.likeRepository.save(idUser,idStatus)
        }
        catch (e){
            console.log(e)
        }
    }
    delete = async (id) => {
        try {
            return await this.likeRepository.delete(id)
        }catch (e){
            console.log(e)
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