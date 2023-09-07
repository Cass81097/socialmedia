"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRoomService_1 = __importDefault(require("../Service/userRoomService"));
class UserRoomController {
    constructor() {
        this.findAll = async (req, res) => {
            let list = await userRoomService_1.default.findAll();
            res.json(list);
        };
        this.update = async (req, res) => {
            let data = await userRoomService_1.default.update(req.params.id, req.body);
            res.json(data);
        };
        this.delete = async (req, res) => {
            let data = await userRoomService_1.default.delete(req.params.id);
            res.json(data);
        };
        this.add = async (req, res) => {
            let data = await userRoomService_1.default.add(req.body);
            res.json(data);
        };
        this.findById = async (req, res) => {
            let data = await userRoomService_1.default.findByUser(req.params.id);
            console.log(data);
            res.json(data);
        };
    }
}
exports.default = new UserRoomController();
//# sourceMappingURL=userRoomController.js.map