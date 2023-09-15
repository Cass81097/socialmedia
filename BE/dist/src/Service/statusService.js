"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusService = void 0;
const data_source_1 = require("../data-source");
const status_1 = require("../entity/status");
const imageService_1 = __importDefault(require("./imageService"));
const likeService_1 = __importDefault(require("./likeService"));
class StatusService {
    constructor() {
        this.add = async (status) => {
            return await this.statusRepository.save(status);
        };
        this.findAll = async () => {
            let status = await this.statusRepository.find({
                relations: {
                    user: true
                }
            });
            for (let i = 0; i < status.length; i++) {
                let imageByStatusId = await imageService_1.default.findAllByStatusId(status[i].id);
                let likeByStatusId = await likeService_1.default.getLikeForStatus(status[i].id);
                console.log(imageByStatusId, 11111);
                status[i] = await Object.assign(Object.assign({}, status[i]), { image: [...imageByStatusId], acountLike: likeByStatusId.likeCount });
            }
            return status;
        };
        this.findByIdUser = async (id) => {
            let status = await this.statusRepository.find({
                relations: {
                    user: true
                },
                where: {
                    user: {
                        id: id
                    }
                }
            });
            for (let i = 0; i < status.length; i++) {
                let imageByStatusId = await imageService_1.default.findAllByStatusId(status[i].id);
                let likeByStatusId = await likeService_1.default.getLikeForStatus(status[i].id);
                console.log(imageByStatusId, 11111);
                status[i] = await Object.assign(Object.assign({}, status[i]), { image: [...imageByStatusId], acountLike: likeByStatusId.likeCount });
            }
            return status;
        };
        this.delete = async (id) => {
            return await this.statusRepository.delete(id);
        };
        this.updateVisibility = async (statusId, visibility) => {
            try {
                const status = this.statusRepository.find({
                    relations: {
                        user: true
                    },
                    where: {
                        id: statusId
                    }
                });
                if (!status) {
                    throw new Error('User not found');
                }
                status.visibility = visibility;
                await this.statusRepository.update(statusId, { visibility: visibility });
                return "Thay trạng thái thành công";
            }
            catch (error) {
                throw new Error('Error updating trạng thái');
            }
        };
        this.updateContent = async (statusId, content) => {
            try {
                const status = this.statusRepository.find({
                    relations: {
                        user: true
                    },
                    where: {
                        id: statusId
                    }
                });
                if (!status) {
                    throw new Error('User not found');
                }
                status.content = content;
                await this.statusRepository.update(statusId, { content: content });
                return "Thay Noi dung Status thành công";
            }
            catch (error) {
                throw new Error('Error updating content');
            }
        };
        this.statusRepository = data_source_1.AppDataSource.getRepository(status_1.Status);
    }
}
exports.StatusService = StatusService;
exports.default = new StatusService();
//# sourceMappingURL=statusService.js.map