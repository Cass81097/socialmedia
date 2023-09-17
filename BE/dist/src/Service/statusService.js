"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusService = void 0;
const data_source_1 = require("../data-source");
const status_1 = require("../entity/status");
const imageStatusService_1 = __importDefault(require("./imageStatusService"));
const likeService_1 = __importDefault(require("./likeService"));
const typeorm_1 = require("typeorm");
class StatusService {
    constructor() {
        this.add = async (status) => {
            return await this.statusRepository.save(status);
        };
        this.findAll = async () => {
            let status = await this.statusRepository.find({
                relations: {
                    receiver: true,
                    sender: true
                }
            });
            for (let i = 0; i < status.length; i++) {
                let imageByStatusId = await imageStatusService_1.default.findAllByStatusId(status[i].id);
                let likeByStatusId = await likeService_1.default.getLikeForStatus(status[i].id);
                status[i] = await Object.assign(Object.assign({}, status[i]), { image: [...imageByStatusId], acountLike: likeByStatusId.likeCount });
            }
            return status;
        };
        this.findStatusByIdUser = async (senderId, receiverId) => {
            let status = await this.statusRepository.find({
                relations: {
                    receiver: true,
                    sender: true
                },
                where: {
                    sender: {
                        id: senderId
                    },
                    receiver: {
                        id: receiverId
                    }
                }
            });
            for (let i = 0; i < status.length; i++) {
                let imageByStatusId = await imageStatusService_1.default.findAllByStatusId(status[i].id);
                let likeByStatusId = await likeService_1.default.getLikeForStatus(status[i].id);
                status[i] = Object.assign(Object.assign({}, status[i]), { image: [...imageByStatusId], acountLike: likeByStatusId.likeCount, listUserLike: [...likeByStatusId.listUserLike] });
            }
            return status;
        };
        this.findByIdUser = async (id) => {
            let status = await this.statusRepository.find({
                relations: {
                    receiver: true,
                    sender: true
                },
                where: {
                    receiver: {
                        id: id
                    }
                },
                order: {
                    time: 'DESC'
                }
            });
            for (let i = 0; i < status.length; i++) {
                let imageByStatusId = await imageStatusService_1.default.findAllByStatusId(status[i].id);
                let likeByStatusId = await likeService_1.default.getLikeForStatus(status[i].id);
                status[i] = Object.assign(Object.assign({}, status[i]), { image: [...imageByStatusId], acountLike: likeByStatusId.likeCount, listUserLike: [...likeByStatusId.listUserLike] });
            }
            return status;
        };
        this.findByIdAndStatus = async (id) => {
            let status = await this.statusRepository.find({
                relations: {
                    receiver: true,
                    sender: true
                },
                where: {
                    receiver: {
                        id: id
                    },
                    visibility: "public"
                }
            });
            for (let i = 0; i < status.length; i++) {
                let imageByStatusId = await imageStatusService_1.default.findAllByStatusId(status[i].id);
                let likeByStatusId = await likeService_1.default.getLikeForStatus(status[i].id);
                status[i] = await Object.assign(Object.assign({}, status[i]), { image: [...imageByStatusId], acountLike: likeByStatusId.likeCount, listUserLike: [...likeByStatusId.listUserLike] });
            }
            return status;
        };
        this.delete = async (statusId) => {
            try {
                await this.statusRepository.createQueryBuilder()
                    .delete().from("like")
                    .where("statusId = :statusId", { statusId })
                    .execute();
                await this.statusRepository.createQueryBuilder()
                    .delete()
                    .from("image")
                    .where("statusId = :statusId", { statusId })
                    .execute();
                await this.statusRepository.createQueryBuilder()
                    .delete()
                    .from("status")
                    .where("id = :statusId", { statusId })
                    .execute();
                return "xoá thành  công";
            }
            catch (error) {
                console.error('Lỗi khi xóa bài viết:', error.message);
                throw error;
            }
        };
        this.updateVisibility = async (statusId, visibility) => {
            try {
                const status = this.statusRepository.find({
                    relations: {
                        receiver: true,
                        sender: true
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
                        receiver: true,
                        sender: true
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
        this.findByContent = async (id, content) => {
            try {
                return await this.statusRepository.find({
                    relations: {
                        receiver: true,
                        sender: true
                    },
                    where: {
                        content: (0, typeorm_1.Like)(`%${content}%`),
                        sender: { id: id }
                    }
                });
            }
            catch (error) {
                throw new Error('Error finding user by name');
            }
        };
        this.statusRepository = data_source_1.AppDataSource.getRepository(status_1.Status);
    }
}
exports.StatusService = StatusService;
exports.default = new StatusService();
//# sourceMappingURL=statusService.js.map