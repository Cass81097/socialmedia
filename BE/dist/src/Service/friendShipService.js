"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendShipService = void 0;
const data_source_1 = require("../data-source");
const friendShip_1 = require("../entity/friendShip");
class FriendShipService {
    constructor() {
        this.findById = async (user1Id, user2Id) => {
            return await this.friendRepository.find({
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
        this.findFriendByUsername = async (username) => {
            const friends = await this.friendRepository
                .createQueryBuilder("friendShip")
                .innerJoinAndSelect("friendShip.user1", "user1")
                .innerJoinAndSelect("friendShip.user2", "user2")
                .where("user1.username = :username1 AND friendShip.status = 'friend'", { username1: username })
                .orWhere("user2.username = :username2 AND friendShip.status = 'friend'", { username2: username })
                .getMany();
            const friendUsers = friends.map((friendShip) => {
                if (friendShip.user1.username === username) {
                    return friendShip.user2;
                }
                else {
                    return friendShip.user1;
                }
            });
            return friendUsers;
        };
        this.sendFriendRequest = async (userId1, userId2) => {
            const data = {
                user1: { id: userId1 },
                user2: { id: userId2 },
                userSendReq: userId1,
                status: 'pending'
            };
            return await this.friendRepository.save(data);
        };
        this.cancelFriendship = async (userId1, userId2) => {
            return await this.friendRepository
                .createQueryBuilder()
                .delete()
                .where('user1.id = :userId1 AND user2.id = :userId2', {
                userId1,
                userId2
            })
                .execute();
        };
        this.acceptFriendRequest = async (userId1, userId2) => {
            return await this.friendRepository
                .createQueryBuilder()
                .update(friendShip_1.FriendShip)
                .set({ status: 'friend' })
                .where('user1.id = :userId1 AND user2.id = :userId2', { userId1, userId2 })
                .execute();
        };
        this.blockFriend = async (userId1, userId2) => {
            const data = {
                user1: { id: userId1 },
                user2: { id: userId2 },
                userSendReq: userId1,
                status: 'block'
            };
            const existingFriendship = await this.friendRepository.findOne({
                where: [
                    { user1: { id: userId1 }, user2: { id: userId2 }, status: 'friend' },
                    { user1: { id: userId1 }, user2: { id: userId2 }, status: 'pending' },
                    { user1: { id: userId2 }, user2: { id: userId1 }, status: 'friend' },
                    { user1: { id: userId2 }, user2: { id: userId1 }, status: 'pending' }
                ]
            });
            if (existingFriendship) {
                await this.friendRepository.delete(existingFriendship.id);
            }
            return await this.friendRepository.save(data);
        };
        this.checkStatusByUserId = async (userId1, userId2) => {
            const friendship = await this.friendRepository.findOne({
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
        this.findBlockedUsers = async (userId) => {
            const blockedUsers = await this.friendRepository.find({
                relations: {
                    user2: true,
                },
                where: [
                    { user1: { id: userId }, status: 'block' },
                    { user2: { id: userId }, status: 'block' },
                ],
            });
            return blockedUsers.map((friendship) => friendship.user2);
        };
        this.findMutualFriend = async (user1Id, user2Id) => {
            const user1Friends = await this.friendRepository
                .createQueryBuilder('friendship')
                .select('friendship.user2', 'user2')
                .leftJoinAndSelect('friendship.user2', 'user')
                .where('friendship.user1 = :user1Id', { user1Id })
                .getRawMany();
            const mutualFriends = await this.friendRepository
                .createQueryBuilder('friendship')
                .select('friendship.user2', 'user2')
                .leftJoinAndSelect('friendship.user2', 'user')
                .where('friendship.user1 = :user2Id', { user2Id })
                .andWhere('friendship.user2 IN (:...user1Friends)', { user1Friends: user1Friends.map(friend => friend.user2) })
                .andWhere('friendship.status = :friendStatus', { friendStatus: 'friend' })
                .getRawMany();
            return mutualFriends;
        };
        this.findFriend = async (user1Id) => {
            const friends = await this.friendRepository.find({
                relations: {
                    user1: true,
                    user2: true
                },
                where: [
                    { user1: { id: user1Id }, status: "friend" },
                    { user2: { id: user1Id }, status: "friend" }
                ]
            });
            const users = friends.map(friend => {
                const user = friend.user1.id === user1Id ? friend.user2 : friend.user1;
                return {
                    id: user.id,
                    username: user.username,
                    fullname: user.fullname,
                    email: user.email,
                    avatar: user.avatar,
                    cover: user.cover
                };
            });
            return users;
        };
        this.friendRepository = data_source_1.AppDataSource.getRepository(friendShip_1.FriendShip);
    }
}
exports.FriendShipService = FriendShipService;
exports.default = new FriendShipService();
//# sourceMappingURL=friendShipService.js.map