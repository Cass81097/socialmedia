"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const status_1 = require("../entity/status");
class PostService {
    constructor() {
        this.getStatus = async (id) => {
            try {
                const listUsers = await this.userRepository.find({
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
        this.userRepository = data_source_1.AppDataSource.getRepository(status_1.Status);
    }
}
exports.default = PostService;
//# sourceMappingURL=postService.js.map