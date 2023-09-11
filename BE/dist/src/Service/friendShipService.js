"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendShipService = void 0;
const data_source_1 = require("../data-source");
const friendShip_1 = require("../entity/friendShip");
class FriendShipService {
    constructor() {
        this.findById = async (user1Id, user2Id) => {
            return await this.Repository.find({
                relations: {
                    user1: true,
                    user2: true
                },
                where: {
                    user1: { id: user1Id },
                    user2: { id: user2Id }
                }
            });
        };
        this.findFriend = async (user1Id, status) => {
            return await this.Repository.find({
                relations: {
                    user1: true,
                    user2: true
                },
                where: {
                    user1: { id: user1Id },
                    status: status
                }
            });
        };
        this.sendFriendRequest = async (userId1, userId2) => {
            const data = {
                user1: { id: userId1 },
                user2: { id: userId2 },
                userSendReq: userId1,
                status: 'pending'
            };
            return await this.Repository.save(data);
        };
        this.cancelFriendship = async (userId1, userId2) => {
            return await this.Repository
                .createQueryBuilder()
                .delete()
                .where('user1.id = :userId1 AND user2.id = :userId2', {
                userId1,
                userId2
            })
                .execute();
        };
        this.acceptFriendRequest = async (userId1, userId2) => {
            return await this.Repository
                .createQueryBuilder()
                .update(friendShip_1.FriendShip)
                .set({ status: 'friend' })
                .where('user1.id = :userId1 AND user2.id = :userId2', { userId1, userId2 })
                .execute();
        };
        this.checkStatusByUserId = async (userId1, userId2) => {
            const friendship = await this.Repository.findOne({
                where: [
                    { user1: { id: userId1 }, user2: { id: userId2 } },
                    { user1: { id: userId2 }, user2: { id: userId1 } }
                ]
            });
            if (friendship) {
                return {
                    status: friendship.status,
                    userSendReq: friendship.userSendReq
                };
            }
            return null;
        };
        this.Repository = data_source_1.AppDataSource.getRepository(friendShip_1.FriendShip);
    }
}
exports.FriendShipService = FriendShipService;
exports.default = new FriendShipService();
//# sourceMappingURL=friendShipService.js.map