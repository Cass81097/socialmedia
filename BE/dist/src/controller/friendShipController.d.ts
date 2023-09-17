import { Request, Response } from "express";
export declare class FriendShipController {
    sendFriendRequest: (req: any, res: any) => Promise<void>;
    cancelFriendship: (req: any, res: any) => Promise<void>;
    acceptFriendRequest: (req: any, res: any) => Promise<void>;
    findById: (req: any, res: any) => Promise<void>;
    checkStatusByUserId: (req: Request, res: Response) => Promise<void>;
    blockFriend: (req: Request, res: Response) => Promise<void>;
    getBlockList: (req: Request, res: Response) => Promise<void>;
    findFriendByUsername: (req: any, res: any) => Promise<void>;
    findCommonFriendsByUsername: (req: any, res: any) => Promise<void>;
    findAll: (req: any, res: any) => Promise<void>;
    findPendingFriend: (req: any, res: any) => Promise<void>;
}
declare const _default: FriendShipController;
export default _default;
