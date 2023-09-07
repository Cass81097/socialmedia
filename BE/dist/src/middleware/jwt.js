"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.SECRET = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.SECRET = '12456';
const auth = (req, res, next) => {
    let authorization = req.headers.authorization;
    if (authorization) {
        let accessToken = req.headers.authorization.split(' ')[1];
        if (accessToken) {
            jsonwebtoken_1.default.verify(accessToken, exports.SECRET, (err, payload) => {
                if (err) {
                    res.status(401).json({
                        error: err.message,
                        message: 'You are anonymous'
                    });
                }
                else {
                    req.decode = payload;
                    next();
                }
            });
        }
        else {
            res.status(401).json({
                message: 'You are anonymous'
            });
        }
    }
    else {
        res.status(401).json({
            message: 'You are anonymous'
        });
    }
};
exports.auth = auth;
exports.default = exports.auth;
//# sourceMappingURL=jwt.js.map