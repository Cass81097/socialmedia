"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomController = void 0;
const roomService_1 = __importDefault(require("../Service/roomService"));
class RoomController {
    constructor() {
        this.findAll = async (req, res) => {
            let list;
            if (req.query.name) {
                list = await this.roomService.findByName(req.query.name);
            }
            else {
                list = await this.roomService.findAll();
            }
            res.json(list);
        };
        this.add = async (req, res) => {
            let data = await this.roomService.add(req.body);
            res.json(data);
        };
        this.update = async (req, res) => {
            let data = await this.roomService.update(req.params.id, req.body);
            res.json(data);
        };
        this.delete = async (req, res) => {
            let data = await this.roomService.delete(req.params.id);
            res.json(data);
        };
        this.findByName = async (req, res) => {
            let data = await this.roomService.findByName(req.query.name);
            res.json(data);
        };
        this.findById = async (req, res) => {
            let data = await this.roomService.findById(req.params.id);
            res.json(data);
        };
        this.roomService = roomService_1.default;
    }
}
exports.RoomController = RoomController;
exports.default = new RoomController();
//# sourceMappingURL=roomController.js.map