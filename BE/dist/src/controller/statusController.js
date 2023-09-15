"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusController = void 0;
const statusService_1 = __importDefault(require("../Service/statusService"));
class StatusController {
    constructor() {
        this.show = async (req, res) => {
            let data = await statusService_1.default.getStatus();
            res.json(data);
        };
    }
}
exports.StatusController = StatusController;
exports.default = new StatusController();
//# sourceMappingURL=statusController.js.map