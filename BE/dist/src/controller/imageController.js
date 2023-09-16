"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageController = void 0;
const imageService_1 = __importDefault(require("../Service/imageService"));
class ImageController {
    constructor() {
        this.add = async (req, res) => {
            let data = await imageService_1.default.add(req.body);
            res.json(200, data);
        };
        this.update = async (req, res) => {
            console.log(req.params.id, req.body, 1111);
            let data = await imageService_1.default.update(req.params.id, req.body);
            res.json(data);
        };
        this.delete = async (req, res) => {
            let data = await imageService_1.default.delete(req.params.id);
            res.json(data);
        };
        this.findAllByStatusId = async (req, res) => {
            return await imageService_1.default.findAllByStatusId(req.params.id);
        };
    }
}
exports.ImageController = ImageController;
exports.default = new ImageController();
//# sourceMappingURL=imageController.js.map