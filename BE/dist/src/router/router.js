"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRouter_1 = require("./userRouter");
const friendShipRouter_1 = require("./friendShipRouter");
const statusRouter_1 = require("./statusRouter");
const imageStatusRouter_1 = require("./imageStatusRouter");
const likeRouter_1 = require("./likeRouter");
const router = (0, express_1.Router)();
router.use('/users', userRouter_1.userRouter);
router.use('/friendShips', friendShipRouter_1.friendShipRouter);
router.use('/status', statusRouter_1.statusRouter);
router.use('/imageStatus', imageStatusRouter_1.imageStatusRouter);
router.use('/likes', likeRouter_1.likeRouter);
exports.default = router;
//# sourceMappingURL=router.js.map