"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeRouter = void 0;
const express_1 = require("express");
const likeController_1 = __importDefault(require("../controller/likeController"));
exports.likeRouter = (0, express_1.Router)();
exports.likeRouter.get("/:statusId", likeController_1.default.getLikeForStatus);
exports.likeRouter.post("", likeController_1.default.addLike);
exports.likeRouter.delete('/:statusId', likeController_1.default.deleteLike);
//# sourceMappingURL=likeRouter.js.map