import {User} from "../entity/user";
import {AppDataSource} from "../data-source";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {SECRET} from "../middleware/jwt";

export class UserService {
    private repository;

    constructor() {
        this.repository = AppDataSource.getRepository(User)
    }
    findAll = async () => {
        return await this.repository.find();
    }
    update = async (id, user) => {
        return await this.repository.update(id, user)

    }

    register = async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
        return this.repository.save(user);
    }


    checkUser = async (user) => {
        let userFind = await this.repository.findOneBy({username: user.username});
        if (!userFind) {
            return 'User is not exist'
        } else {
            let passWordCompare =  await bcrypt.compare(user.password, userFind.password);
            console.log(passWordCompare)
            if (passWordCompare) {
                let payload = {
                    idUser: userFind.id,
                    username: userFind.username,
                    role: 'admin'
                }
                return {
                    token: jwt.sign(payload, SECRET, {
                        expiresIn: 36000 * 10 * 100
                    }),
                    idUser: userFind.id,
                    name: userFind.name,
                    email: userFind.email,
                    username: userFind.username,
                    password: userFind.password,
                    status: userFind.status,
                    image:userFind.image,
                   gender:userFind.gender
                }
            } else {
                return 'Password is wrong'
            }
        }
    }
}
export default new UserService()