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
class UserService {
    constructor() {
        this.findAll = async () => {
            return await this.repository.find();
        };
        this.update = async (id, user) => {
            return await this.repository.update(id, user);
        };
        this.register = async (user) => {
            user.password = await bcrypt_1.default.hash(user.password, 10);
            return this.repository.save(user);
        };
        this.checkUser = async (user) => {
            let userFind = await this.repository.findOneBy({ username: user.username });
            if (!userFind) {
                return 'User is not exist';
            }
            else {
                let passWordCompare = await bcrypt_1.default.compare(user.password, userFind.password);
                console.log(passWordCompare);
                if (passWordCompare) {
                    let payload = {
                        idUser: userFind.id,
                        username: userFind.username,
                        role: 'admin'
                    };
                    return {
                        token: jsonwebtoken_1.default.sign(payload, jwt_1.SECRET, {
                            expiresIn: 36000 * 10 * 100
                        }),
                        idUser: userFind.id,
                        name: userFind.name,
                        email: userFind.email,
                        username: userFind.username,
                        password: userFind.password,
                        status: userFind.status,
                        image: userFind.image,
                        gender: userFind.gender
                    };
                }
                else {
                    return 'Password is wrong';
                }
            }
        };
        this.repository = data_source_1.AppDataSource.getRepository(user_1.User);
    }
}
exports.UserService = UserService;
exports.default = new UserService();
//# sourceMappingURL=userService.js.map