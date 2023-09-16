"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeService = void 0;
const data_source_1 = require("../data-source");
const like_1 = require("../entity/like");
class LikeService {
    constructor() {
        this.getLikeForStatus = async (id) => {
            try {
                const likeRecords = await this.likeRepository.find({
                    where: {
                        status: {
                            id: id
                        }
                    },
                    relations: {
                        user: true
                    }
                });
                const likeCount = likeRecords.length;
                return { likeRecords, likeCount };
            }
            catch (e) {
                console.log(e);
            }
        };
        this.save = async (statusId, userId) => {
            const now = new Date();
            const options = { timeZone: 'Asia/Ho_Chi_Minh', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
            const vnDateTime = new Intl.DateTimeFormat('en-US', options).format(now);
            try {
                const existingLike = await this.likeRepository.findOne({
                    where: {
                        status: { id: statusId },
                        user: { id: userId },
                    },
                });
                if (existingLike) {
                    existingLike.isLiked = true;
                    return await this.likeRepository.save(existingLike);
                }
                else {
                    const newLike = this.likeRepository.create({
                        status: { id: statusId },
                        user: { id: userId },
                        isLiked: true,
                        time: vnDateTime
                    });
                    return await this.likeRepository.save(newLike);
                }
            }
            catch (e) {
                console.log(e);
            }
        };
        this.delete = async (statusId, userId) => {
            try {
                const likeToDelete = await this.likeRepository.findOne({ where: { status: { id: statusId }, user: { id: userId } } });
                if (!likeToDelete) {
                    return null;
                }
                const del = await this.likeRepository.delete(likeToDelete);
                return del;
            }
            catch (e) {
                console.log(e);
                throw e;
            }
        };
        this.update = async (id, user) => {
            try {
                return await this.likeRepository.update(id, user);
            }
            catch (error) {
                throw new Error('Error updating user');
            }
        };
        this.likeRepository = data_source_1.AppDataSource.getRepository(like_1.Like);
    }
}
exports.LikeService = LikeService;
exports.default = new LikeService();
//# sourceMappingURL=likeService.js.map