"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRouter_1 = require("./userRouter");
const friendShipRouter_1 = require("./friendShipRouter");
const router = (0, express_1.Router)();
router.use('/users', userRouter_1.userRouter);
router.use('/friendShips', friendShipRouter_1.friendShipRouter);
exports.default = router;
//# sourceMappingURL=router.js.map