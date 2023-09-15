"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusRouter = void 0;
const express_1 = require("express");
const statusController_1 = __importDefault(require("../controller/statusController"));
exports.statusRouter = (0, express_1.Router)();
exports.statusRouter.get("/", statusController_1.default.show);
//# sourceMappingURL=statusRouter.js.map