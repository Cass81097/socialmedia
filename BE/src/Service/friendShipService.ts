import { AppDataSource } from "../data-source";
import { FriendShip } from "../entity/friendShip";
import { Like } from "typeorm";
import { User } from "../entity/user";

export class FriendShipService {
    private Repository;

    constructor() {
        this.Repository = AppDataSource.getRepository(FriendShip)
    }

    findById = async (user1Id, user2Id) => {
        return await this.Repository.find({
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
    findFriend = async (user1Id, status) => {
        return await this.Repository.find({
            relations: {
                user1: true,
                user2: true
            },
            where: {
                user1: { id: user1Id },
                status: status
            }
        })
    }

    // //Gửi lời mời kết bạn
    // sendFriendRequest = async (datas) => {
    //     let data = {...datas, status: 'pending'}
    //     return await this.Repository.save(data)
    // }

    // Gửi lời mời kết bạn
    sendFriendRequest = async (userId1, userId2) => {
        const data = {
            user1: { id: userId1 },
            user2: { id: userId2 },
            userSendReq: userId1,
            status: 'pending'
        };

        return await this.Repository.save(data);
    };

    //Huỷ lời mời kết bạn và Huỷ kết bạn
    cancelFriendship = async (userId1, userId2) => {
        return await this.Repository
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
        return await this.Repository
            .createQueryBuilder()
            .update(FriendShip)
            .set({ status: 'friend' })
            .where('user1.id = :userId1 AND user2.id = :userId2', { userId1, userId2 })
            .execute();
    }

    checkStatusByUserId = async (userId1, userId2) => {
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
}
export default new FriendShipService();