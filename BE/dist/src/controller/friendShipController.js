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
        this.findFriend = async (req, res) => {
            const { user1: { id: user1Id }, status: status } = req.body;
            let data = await friendShipService_1.default.findFriend(user1Id, status);
            res.json(data);
        };
        this.checkStatusByUserId = async (req, res) => {
            const userId1 = req.params.userId1;
            const userId2 = req.params.userId2;
            let data = await friendShipService_1.default.checkStatusByUserId(userId1, userId2);
            res.json(data);
        };
    }
}
exports.FriendShipController = FriendShipController;
exports.default = new FriendShipController();
//# sourceMappingURL=friendShipController.js.map