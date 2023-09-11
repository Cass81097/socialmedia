"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const userController_1 = __importDefault(require("../controller/userController"));
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post('/register', userController_1.default.register);
exports.userRouter.post('/login', userController_1.default.login);
exports.userRouter.put('/users/:id', userController_1.default.update);
exports.userRouter.get('/', userController_1.default.findAll);
exports.userRouter.get('/find/:username', userController_1.default.findByUserName);
exports.userRouter.get('/username', userController_1.default.findAllUserName);
//# sourceMappingURL=userRouter.js.map