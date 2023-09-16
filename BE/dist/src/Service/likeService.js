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
                let listUserLike = [];
                for (let i = 0; i < likeRecords.length; i++) {
                    listUserLike.push(likeRecords[i].user.username);
                }
                return { listUserLike, likeCount };
            }
            catch (e) {
                console.log(e);
            }
        };
        this.save = async (data) => {
            return await this.likeRepository.save(data);
        };
        this.delete = async (statusId) => {
            return await this.likeRepository.delete(statusId);
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