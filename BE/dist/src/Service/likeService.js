"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeService = void 0;
const data_source_1 = require("../data-source");
const typeorm_1 = require("typeorm");
class LikeService {
    constructor() {
        this.getLikeForStatus = async (id) => {
            try {
                const listUsers = await this.likeRepository.find({
                    where: {
                        status: {
                            id: id
                        }
                    }
                });
                const likeCount = listUsers.length;
                return { listUsers, likeCount };
            }
            catch (e) {
                console.log(e);
            }
        };
        this.save = async (idUser, idStatus) => {
            try {
                return await this.likeRepository.save(idUser, idStatus);
            }
            catch (e) {
                console.log(e);
            }
        };
        this.delete = async (id) => {
            try {
                return await this.likeRepository.delete(id);
            }
            catch (e) {
                console.log(e);
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
        this.likeRepository = data_source_1.AppDataSource.getRepository(typeorm_1.Like);
    }
}
exports.LikeService = LikeService;
exports.default = new LikeService();
//# sourceMappingURL=likeService.js.map