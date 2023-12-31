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
   
    checkStatusByUserId = async (req: Request, res: Response) => {
        const userId1 = req.params.userId1;
        const userId2 = req.params.userId2;
        let data = await friendShipService.checkStatusByUserId(userId1, userId2);
        res.json(data);
    };
    blockFriend = async (req: Request, res: Response) => {
        const userId1 = req.params.userId1;
        const userId2 = req.params.userId2;
        let data = await friendShipService.blockFriend(userId1, userId2);
        res.json(data);
    };

    getBlockList = async (req: Request, res: Response) => {
        let data = await friendShipService.findBlockedUsers(req.params.id);
        res.json(data);
    };

    findFriendByUsername = async (req, res) => {
        let data = await friendShipService.findFriendByUsername(req.params.username)
        res.json(data);
    }

    findCommonFriendsByUsername = async (req, res) => {
        const username1 = req.params.username1;
        const username2 = req.params.username2;
        let data = await friendShipService.findCommonFriendsByUsername(username1, username2)
        res.json(data);
    }

    findAll = async (req,res)=>{
        let list = await friendShipService.findAll()
        res.json(list)
    }
}
export default new FriendShipController()