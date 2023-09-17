"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeController = void 0;
const likeService_1 = __importDefault(require("../Service/likeService"));
class LikeController {
    constructor() {
        this.addLike = async (req, res) => {
            let data = await likeService_1.default.save(req.params.statusId, req.body.userId);
            res.json(data);
        };
        this.deleteLike = async (req, res) => {
            const del = await likeService_1.default.deleteByUserIdAndStatusId(req.params.statusId, req.query.userId);
            res.json(del);
        };
        this.getLikeForStatus = async (req, res) => {
            const list = await likeService_1.default.getLikeForStatus(req.params.id);
            res.status(200).json(list);
        };
    }
}
exports.LikeController = LikeController;
exports.default = new LikeController();
//# sourceMappingURL=likeController.js.map