export declare class FriendShipService {
    private friendRepository;
    constructor();
    findById: (user1Id: any, user2Id: any) => Promise<any>;
    findFriendByUsername: (username: any) => Promise<any>;
    sendFriendRequest: (userId1: any, userId2: any) => Promise<any>;
    cancelFriendship: (userId1: any, userId2: any) => Promise<any>;
    acceptFriendRequest: (userId1: any, userId2: any) => Promise<any>;
    blockFriend: (userId1: any, userId2: any) => Promise<any>;
    checkStatusByUserId: (userId1: any, userId2: any) => Promise<{
        status: any;
        userSendReq: any;
    }>;
    findBlockedUsers: (userId: any) => Promise<any>;
}
declare const _default: FriendShipService;
export default _default;
