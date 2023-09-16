"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageRouter = void 0;
const express_1 = require("express");
const imageController_1 = __importDefault(require("../controller/imageController"));
exports.imageRouter = (0, express_1.Router)();
exports.imageRouter.delete("/:id", imageController_1.default.delete);
exports.imageRouter.post("", imageController_1.default.add);
exports.imageRouter.put("/:id", imageController_1.default.update);
exports.imageRouter.get("/:id", imageController_1.default.findAllByStatusId);
//# sourceMappingURL=imageRouter.js.map