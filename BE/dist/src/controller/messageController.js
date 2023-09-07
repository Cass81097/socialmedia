"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messageService_1 = __importDefault(require("../Service/messageService"));
class MessageController {
    constructor() {
        this.findAll = async (req, res) => {
            let list = await messageService_1.default.getAllInOrder();
            res.json(list);
        };
        this.update = async (req, res) => {
            let data = await messageService_1.default.update(req.params.id, req.body);
            res.json(data);
        };
        this.delete = async (req, res) => {
            let data = await messageService_1.default.delete(req.params.id);
            res.json(data);
        };
        this.add = async (req, res) => {
            let data = await messageService_1.default.add(req.body);
            res.json(data);
        };
        this.findById = async (req, res) => {
            let data = await messageService_1.default.findById(req.params.id);
            res.json(data);
        };
    }
}
exports.default = new MessageController();
//# sourceMappingURL=messageController.js.map