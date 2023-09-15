"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusRouter = void 0;
const express_1 = require("express");
const statusController_1 = __importDefault(require("../controller/statusController"));
exports.statusRouter = (0, express_1.Router)();
exports.statusRouter.get("/", statusController_1.default.findAll);
exports.statusRouter.get("/:id", statusController_1.default.findAllByIdUser);
exports.statusRouter.delete("/:id", statusController_1.default.delete);
exports.statusRouter.post("", statusController_1.default.add);
exports.statusRouter.put('/content/:id', statusController_1.default.updateContent);
exports.statusRouter.put('/visibility/:id', statusController_1.default.updateVisibility);
//# sourceMappingURL=statusRouter.js.map