"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendShipController = void 0;
const friendShipService_1 = __importDefault(require("../Service/friendShipService"));
class FriendShipController {
    constructor() {
        this.sendFriendRequest = async (req, res) => {
            const userId1 = req.params.userId1;
            const userId2 = req.params.userId2;
            let data = await friendShipService_1.default.sendFriendRequest(userId1, userId2);
            res.json(data);
        };
        this.cancelFriendship = async (req, res) => {
            const userId1 = req.params.userId1;
            const userId2 = req.params.userId2;
            let data = await friendShipService_1.default.cancelFriendship(userId1, userId2);
            res.json(data);
        };
        this.acceptFriendRequest = async (req, res) => {
            const userId1 = req.params.userId1;
            const userId2 = req.params.userId2;
            let data = await friendShipService_1.default.acceptFriendRequest(userId1, userId2);
            res.json(data);
        };
        this.findById = async (req, res) => {
            console.log(req.body, 111);
            const { user1: { id: user1Id }, user2: { id: user2Id } } = req.body;
            let data = await friendShipService_1.default.findById(user1Id, user2Id);
            res.json(data);
        };
        this.checkStatusByUserId = async (req, res) => {
            const userId1 = req.params.userId1;
            const userId2 = req.params.userId2;
            let data = await friendShipService_1.default.checkStatusByUserId(userId1, userId2);
            res.json(data);
        };
        this.blockFriend = async (req, res) => {
            const userId1 = req.params.userId1;
            const userId2 = req.params.userId2;
            let data = await friendShipService_1.default.blockFriend(userId1, userId2);
            res.json(data);
        };
        this.getBlockList = async (req, res) => {
            let data = await friendShipService_1.default.findBlockedUsers(req.params.id);
            res.json(data);
        };
        this.findFriendByUsername = async (req, res) => {
            let data = await friendShipService_1.default.findFriendByUsername(req.params.username);
            res.json(data);
        };
        this.findCommonFriendsByUsername = async (req, res) => {
            const username1 = req.params.username1;
            const username2 = req.params.username2;
            let data = await friendShipService_1.default.findCommonFriendsByUsername(username1, username2);
            res.json(data);
        };
        this.findAll = async (req, res) => {
            let list = await friendShipService_1.default.findAll();
            res.json(list);
        };
        this.findPendingFriend = async (req, res) => {
            const user1Id = req.params.user1Id;
            let data = await friendShipService_1.default.findPendingFriend(user1Id);
            res.json(data);
        };
    }
}
exports.FriendShipController = FriendShipController;
exports.default = new FriendShipController();
//# sourceMappingURL=friendShipController.js.map