"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userService_1 = __importDefault(require("../Service/userService"));
class UserController {
    constructor() {
        this.register = async (req, res) => {
            const user = await userService_1.default.register(req.body);
            res.status(201).json({ message: user, userId: user.id });
        };
        this.login = async (req, res) => {
            let resultCheck = await userService_1.default.checkUser(req.body);
            res.status(200).json(resultCheck);
        };
        this.update = async (req, res) => {
            let data = await userService_1.default.update(req.params.id, req.body);
            console.log(req.params.id, req.body);
            res.json(data);
        };
        this.findAll = async (req, res) => {
            let list = await userService_1.default.findAll();
            res.json(list);
        };
        this.findByUserName = async (req, res) => {
            let result = await userService_1.default.findByUserName(req.params.username);
            res.json(result);
        };
        this.findByEmail = async (req, res) => {
            let result = await userService_1.default.findByEmail(req.params.email);
            res.json(result);
        };
        this.findAllUserName = async (req, res) => {
            let result = await userService_1.default.findAllUserName();
            res.json(result);
        };
        this.updatePassword = async (req, res) => {
            let data = await userService_1.default.updatePassword(req.params.id, req.body.oldPassword, req.body.newPassword);
            console.log(req.params.id, req.body);
            res.json(data);
        };
    }
}
exports.UserController = UserController;
exports.default = new UserController();
//# sourceMappingURL=userController.js.map