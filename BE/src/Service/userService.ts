import { User } from "../entity/user";
import { AppDataSource } from "../data-source";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SECRET } from "../middleware/jwt";

export class UserService {
    private userRepository;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User)
    }

    findAll = async () => {
        return await this.userRepository.find();
    }

    update = async (id, user) => {
        return await this.userRepository.update(id, user)
    }

    register = async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
        user.passwordConfirm = user.password;
        return this.userRepository.save(user);
    }

    findByEmail = async (email) => {
        return await this.userRepository.findOne({ email });
    }

    checkUser = async (user) => {
        let userFind = await this.userRepository.findOneBy({ email: user.email });
        if (!userFind) {
            return 'Email is not exist'
        } else {
            let passWordCompare = await bcrypt.compare(user.password, userFind.password);
            console.log(passWordCompare)
            if (passWordCompare) {
                let payload = {
                    id: userFind.id,
                    email: userFind.email,
                    role: 'admin'
                }
                return {
                    token: jwt.sign(payload, SECRET, {
                        expiresIn: 36000 * 10 * 100
                    }),
                    id: userFind.id,
                    name: userFind.name,
                    email: userFind.email,
                    username: userFind.username,
                    password: userFind.password,
                    status: userFind.status,
                    image: userFind.image,
                    gender: userFind.gender
                }
            } else {
                return 'Password is wrong'
            }
        }
    }
}
export default new UserService()