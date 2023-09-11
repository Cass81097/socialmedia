import { Request, Response } from "express";
export declare class FriendShipController {
    sendFriendRequest: (req: any, res: any) => Promise<void>;
    cancelFriendship: (req: any, res: any) => Promise<void>;
    acceptFriendRequest: (req: any, res: any) => Promise<void>;
    findById: (req: any, res: any) => Promise<void>;
    findFriend: (req: any, res: any) => Promise<void>;
    checkStatusByUserId: (req: Request, res: Response) => Promise<void>;
}
declare const _default: FriendShipController;
export default _default;
