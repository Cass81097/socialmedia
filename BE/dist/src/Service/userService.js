"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_1 = require("../entity/user");
const data_source_1 = require("../data-source");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("../middleware/jwt");
const typeorm_1 = require("typeorm");
class UserService {
    constructor() {
        this.findAll = async () => {
            try {
                return await this.userRepository.find();
            }
            catch (error) {
                throw new Error('Error retrieving users');
            }
        };
        this.findAllUserName = async () => {
            try {
                const users = await this.userRepository.find();
                return users.map((user) => user.username);
            }
            catch (error) {
                throw new Error('Error retrieving usernames');
            }
        };
        this.update = async (id, user) => {
            try {
                return await this.userRepository.update(id, user);
            }
            catch (error) {
                throw new Error('Error updating user');
            }
        };
        this.register = async (user) => {
            try {
                const existingUser = await this.userRepository.findOneBy({ email: user.email });
                if (existingUser) {
                    return 'User already exists';
                }
                user.password = await bcrypt_1.default.hash(user.password, 10);
                user.passwordConfirm = user.password;
                return this.userRepository.save(user);
            }
            catch (error) {
                throw new Error('Error registering user');
            }
        };
        this.findByUserName = async (username) => {
            try {
                return await this.userRepository.find({
                    where: {
                        username: (0, typeorm_1.Like)(`${username}`)
                    }
                });
            }
            catch (error) {
                throw new Error('Error finding user by username');
            }
        };
        this.findByName = async (username) => {
            try {
                return await this.userRepository.find({
                    where: {
                        username: (0, typeorm_1.Like)(`%${username}%`)
                    }
                });
            }
            catch (error) {
                throw new Error('Error finding user by name');
            }
        };
        this.findByEmail = async (email) => {
            try {
                return this.userRepository.find({
                    where: {
                        email: email
                    }
                });
            }
            catch (error) {
                throw new Error('Error finding user by email');
            }
        };
        this.findUserById = async (id) => {
            try {
                return await this.userRepository.find({
                    where: {
                        id: id
                    }
                });
            }
            catch (error) {
                throw new Error('Error finding user by ID');
            }
        };
        this.updateAvatar = async (userId, avatar) => {
            try {
                const user = this.userRepository.find({
                    where: {
                        id: userId
                    }
                });
                if (!user) {
                    throw new Error('User not found');
                }
                user.avatar = avatar;
                await this.userRepository.update(userId, { avatar: avatar });
                return "Thay Avatar thành công";
            }
            catch (error) {
                throw new Error('Error updating avatar');
            }
        };
        this.updateCover = async (userId, cover) => {
            try {
                const user = this.userRepository.find({
                    where: {
                        id: userId
                    }
                });
                if (!user) {
                    throw new Error('User not found');
                }
                user.cover = cover;
                await this.userRepository.update(userId, { cover: cover });
                return "Thay Cover thành công";
            }
            catch (error) {
                throw new Error('Error updating cover');
            }
        };
        this.updatePassword = async (userId, oldPassword, newPassword) => {
            try {
                console.log("oldPass", oldPassword);
                console.log("newPass", newPassword);
                const user = await this.findUserById(userId);
                console.log(user, "userService");
                if (!user) {
                    throw new Error('Không tìm thấy người dùng.');
                }
                console.log(user[0].password);
                const isPasswordValid = await bcrypt_1.default.compare(oldPassword, user[0].password);
                if (!isPasswordValid) {
                    throw new Error('Mật khẩu cũ không đúng.');
                }
                const hashedNewPassword = await bcrypt_1.default.hash(newPassword, 10);
                user.password = hashedNewPassword;
                await this.userRepository.update(userId, { password: hashedNewPassword });
                return "mat khau da duoc cap nhat";
            }
            catch (error) {
                throw new Error('Error updating password');
            }
        };
        this.checkUser = async (user) => {
            try {
                let userFind = await this.userRepository.findOneBy({ email: user.email });
                if (!userFind) {
                    return 'Emailkhông tồn tại';
                }
                else {
                    let passWordCompare = await bcrypt_1.default.compare(user.password, userFind.password);
                    console.log(passWordCompare);
                    if (passWordCompare) {
                        let payload = {
                            id: userFind.id,
                            email: userFind.email,
                            role: 'admin'
                        };
                        return {
                            token: jsonwebtoken_1.default.sign(payload, jwt_1.SECRET, {
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
                        };
                    }
                    else {
                        return 'Mật khẩu không đúng';
                    }
                }
            }
            catch (error) {
                throw new Error('Error checking user');
            }
        };
        this.userRepository = data_source_1.AppDataSource.getRepository(user_1.User);
    }
}
exports.UserService = UserService;
exports.default = new UserService();
//# sourceMappingURL=userService.js.map