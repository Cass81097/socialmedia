export declare class FriendShipService {
    private Repository;
    constructor();
    findById: (user1Id: any, user2Id: any) => Promise<any>;
    findFriend: (user1Id: any, status: any) => Promise<any>;
    sendFriendRequest: (userId1: any, userId2: any) => Promise<any>;
    cancelFriendship: (userId1: any, userId2: any) => Promise<any>;
    acceptFriendRequest: (userId1: any, userId2: any) => Promise<any>;
    checkStatusByUserId: (userId1: any, userId2: any) => Promise<{
        status: any;
        userSendReq: any;
    }>;
}
declare const _default: FriendShipService;
export default _default;