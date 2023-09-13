import {Router} from "express";
import friendShipController from "../controller/friendShipController";
export const friendShipRouter = Router();


friendShipRouter.post('/request/:userId1/:userId2', friendShipController.sendFriendRequest);
friendShipRouter.post('/accept/:userId1/:userId2',friendShipController.acceptFriendRequest);

friendShipRouter.post('/findId', friendShipController.findById);
friendShipRouter.get('/checkStatusByUserId/:userId1/:userId2', friendShipController.checkStatusByUserId);
friendShipRouter.post('/block/:userId1/:userId2', friendShipController.blockFriend);
friendShipRouter.get('/blocklist/:id', friendShipController.getBlockList);

friendShipRouter.get('/listFriend/:username', friendShipController.findFriendByUsername);
friendShipRouter.get('/mutual-friends/:user1/:user2', friendShipController.findMutualFriend);
friendShipRouter.get('/listFriend/id/:user1Id', friendShipController.findFriend);