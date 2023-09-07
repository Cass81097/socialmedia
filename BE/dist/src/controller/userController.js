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
            await userService_1.default.register(req.body);
            res.status(201).json('Create user success');
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
    }
}
exports.UserController = UserController;
exports.default = new UserController();
//# sourceMappingURL=userController.js.map