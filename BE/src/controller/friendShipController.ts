import { Request, Response } from "express";
import friendShipService from "../Service/friendShipService";
export class FriendShipController {
    sendFriendRequest = async (req, res) => {
        const userId1 = req.params.userId1;
        const userId2 = req.params.userId2;
        let data = await friendShipService.sendFriendRequest(userId1, userId2)
        res.json(data);
    }
    cancelFriendship = async (req, res) => {
        const userId1 = req.params.userId1;
        const userId2 = req.params.userId2;
        let data = await friendShipService.cancelFriendship(userId1, userId2)
        res.json(data);
    }
    acceptFriendRequest = async (req, res) => {
        const userId1 = req.params.userId1;
        const userId2 = req.params.userId2;
        let data = await friendShipService.acceptFriendRequest(userId1, userId2)
        res.json(data);
    }
    findById = async (req, res) => {
        console.log(req.body, 111)
        const { user1: { id: user1Id }, user2: { id: user2Id } } = req.body
        let data = await friendShipService.findById(user1Id, user2Id)
        res.json(data);
    }
    findFriend = async (req, res) => {
        const { user1: { id: user1Id }, status: status } = req.body
        let data = await friendShipService.findFriend(user1Id, status)
        res.json(data);
    }
    checkStatusByUserId = async (req: Request, res: Response) => {
        const userId1 = req.params.userId1;
        const userId2 = req.params.userId2;
        let data = await friendShipService.checkStatusByUserId(userId1, userId2);
        res.json(data);
    };
}
export default new FriendShipController()