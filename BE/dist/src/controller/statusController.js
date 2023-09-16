"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusController = void 0;
const statusService_1 = __importDefault(require("../Service/statusService"));
class StatusController {
    constructor() {
        this.findAll = async (req, res) => {
            let list = await statusService_1.default.findAll();
            console.log(list);
            res.json(list);
        };
        this.add = async (req, res) => {
            let data = await statusService_1.default.add(req.body);
            res.json(200, data);
        };
        this.delete = async (req, res) => {
            let data = await statusService_1.default.delete(req.params.id);
            res.json(data);
        };
        this.updateContent = async (req, res) => {
            const userId = req.params.id;
            const content = req.body.content;
            console.log(userId, content, 1111);
            let data = await statusService_1.default.updateContent(userId, content);
            res.json(data);
        };
        this.updateVisibility = async (req, res) => {
            const userId = req.params.id;
            const visibility = req.body.visibility;
            let data = await statusService_1.default.updateVisibility(userId, visibility);
            res.json(data);
        };
        this.findAllByIdUser = async (req, res) => {
            const userId = req.params.id;
            let data = await statusService_1.default.findByIdUser(userId);
            res.json(data);
        };
    }
}
exports.StatusController = StatusController;
exports.default = new StatusController();
//# sourceMappingURL=statusController.js.map