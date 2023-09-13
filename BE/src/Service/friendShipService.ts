import { AppDataSource } from "../data-source";
import { FriendShip } from "../entity/friendShip";

export class FriendShipService {
    private friendRepository;

    constructor() {
        this.friendRepository = AppDataSource.getRepository(FriendShip)
    }

    findById = async (user1Id, user2Id) => {
        return await this.friendRepository.find({
            relations: {
                user1: true,
                user2: true
            },
            where: {
                user1: { id: user1Id },
                user2: { id: user2Id }
            }
        })
    }

    findFriendByUsername = async (username) => {
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
            } else {
                return friendShip.user1;
            }
        });

        return friendUsers;
    };

    // Gửi lời mời kết bạn
    sendFriendRequest = async (userId1, userId2) => {
        const data = {
            user1: { id: userId1 },
            user2: { id: userId2 },
            userSendReq: userId1,
            status: 'pending'
        };

        return await this.friendRepository.save(data);
    };

    //Huỷ lời mời kết bạn và Huỷ kết bạn
    cancelFriendship = async (userId1, userId2) => {
        return await this.friendRepository
            .createQueryBuilder()
            .delete()
            .where('user1.id = :userId1 AND user2.id = :userId2', {
                userId1,
                userId2
            })
            .execute();
    }
    //Nhận lời mời kết bạn
    acceptFriendRequest = async (userId1, userId2) => {
        return await this.friendRepository
            .createQueryBuilder()
            .update(FriendShip)
            .set({ status: 'friend' })
            .where('user1.id = :userId1 AND user2.id = :userId2', { userId1, userId2 })
            .execute();
    }

    blockFriend = async (userId1, userId2) => {
        const data = {
            user1: { id: userId1 },
            user2: { id: userId2 },
            userSendReq: userId1,
            status: 'block'
        };

        // Check if there is an existing friendship with status "friend" or "pending" for both user1 and user2
        const existingFriendship = await this.friendRepository.findOne({
            where: [
                { user1: { id: userId1 }, user2: { id: userId2 }, status: 'friend' },
                { user1: { id: userId1 }, user2: { id: userId2 }, status: 'pending' },
                { user1: { id: userId2 }, user2: { id: userId1 }, status: 'friend' },
                { user1: { id: userId2 }, user2: { id: userId1 }, status: 'pending' }
            ]
        });

        if (existingFriendship) {
            // Delete the existing friendship
            await this.friendRepository.delete(existingFriendship.id);
        }

        return await this.friendRepository.save(data);
    };

    checkStatusByUserId = async (userId1, userId2) => {
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

    findBlockedUsers = async (userId) => {
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


    findMutualFriend = async (user1Id, user2Id) => {
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
        return mutualFriends
    }

    findFriend = async (user1Id) => {
        const friends = await this.friendRepository.createQueryBuilder('friendship')
            .leftJoinAndSelect('friendship.user1', 'user1')
            .leftJoinAndSelect('friendship.user2', 'user2')
            .where('friendship.status = "friend"')
            .andWhere('(user1.id = :userId1 OR user2.id = :userId2)', { userId1: user1Id, userId2: user1Id })
            .getMany();

        const users = friends.flatMap(friendship => {
            const user1 = friendship.user1;
            const user2 = friendship.user2;
            const filteredUsers = [];

            if (user1.id !== user1Id) {
                filteredUsers.push({
                    id: user1.id,
                    username: user1.username,
                    fullname: user1.fullname,
                    avatar: user1.avatar
                });
            }

            if (user2.id !== user1Id && user2.id !== user1.id) {
                filteredUsers.push({
                    id: user2.id,
                    username: user2.username,
                    fullname: user2.fullname,
                    avatar: user2.avatar
                });
            }

            return filteredUsers;
        }).filter((user, index, self) => user.id !== user1Id && self.findIndex(u => u.id === user.id) === index);

        return users;
    };
}
export default new FriendShipService();