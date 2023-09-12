"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendShipRouter = void 0;
const express_1 = require("express");
const friendShipController_1 = __importDefault(require("../controller/friendShipController"));
exports.friendShipRouter = (0, express_1.Router)();
exports.friendShipRouter.post('/request/:userId1/:userId2', friendShipController_1.default.sendFriendRequest);
exports.friendShipRouter.post('/accept/:userId1/:userId2', friendShipController_1.default.acceptFriendRequest);
exports.friendShipRouter.post('/unfriend/:userId1/:userId2', friendShipController_1.default.cancelFriendship);
exports.friendShipRouter.post('/listFriend', friendShipController_1.default.findFriend);
exports.friendShipRouter.post('/findId', friendShipController_1.default.findById);
exports.friendShipRouter.get('/checkStatusByUserId/:userId1/:userId2', friendShipController_1.default.checkStatusByUserId);
exports.friendShipRouter.post('/block/:userId1/:userId2', friendShipController_1.default.blockFriend);
//# sourceMappingURL=friendShipRouter.js.map