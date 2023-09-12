import { User } from "../entity/user";
import { AppDataSource } from "../data-source";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SECRET } from "../middleware/jwt";
import { Like } from "typeorm";

export class UserService {
    private userRepository;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User)
    }

    findAll = async () => {
        return await this.userRepository.find();
    }

    findAllUserName = async () => {
        const users = await this.userRepository.find();
        return users.map((user) => user.username);
      }

    update = async (id, user) => {
        return await this.userRepository.update(id, user)
    }

    register = async (user) => {
        const existingUser = await this.userRepository.findOneBy({ email: user.email });
        if (existingUser) {
            return 'User already exists';
        }
        user.password = await bcrypt.hash(user.password, 10);
        user.passwordConfirm = user.password;
        return this.userRepository.save(user);
    }

    findByUserName = async (username) => {
        return await this.userRepository.find({
            where: {
                username: Like(`${username}`)
            }
        })
    }

    findByName = async (username) => {
        return await this.userRepository.find({
            where: {
                username: Like(`%${username}%`)
            }
        })
    }

    findByEmail = async (email) => {
        return this.userRepository.find({
          where: {
            email: email
          }
        });
    }

    findUserById = async (id) => {
        return await this.userRepository.find({
            where : {
                id : id
            }
        })
    }

    updatePassword = async (userId, oldPassword, newPassword) =>{
        console.log("oldPass",oldPassword)
        console.log("newPass",newPassword)
        const user = await this.findUserById(userId);
        console.log(user,"userService")
        if (!user) {
            throw new Error('Không tìm thấy người dùng.');
        }
        console.log(user[0].password)


        // Kiểm tra xem mật khẩu cũ có đúng không
        const isPasswordValid = await bcrypt.compare(oldPassword, user[0].password);

        if (!isPasswordValid) {
            throw new Error('Mật khẩu cũ không đúng.');
        }

        // Mã hóa mật khẩu mới
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Cập nhật mật khẩu mới vào cơ sở dữ liệu
        user.password = hashedNewPassword;

        // Lưu thông tin người dùng đã được cập nhật vào cơ sở dữ liệu
        await this.userRepository.update(userId, { password: hashedNewPassword });

        return "mat khau da duoc cap nhat" ;
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
                    fullname: userFind.fullname,
                    email: userFind.email,
                    username: userFind.username,
                    password: userFind.password,
                    status: userFind.status,
                    avatar: userFind.avatar,
                    cover: userFind.cover,
                    gender: userFind.gender
                }
            } else {
                return 'Password is wrong'
            }
        }
    }
}
export default new UserService()