"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("./user");
const like_1 = require("./like");
const imageStatus_1 = __importDefault(require("./imageStatus"));
let Status = class Status {
};
exports.Status = Status;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Status.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "longtext" }),
    __metadata("design:type", String)
], Status.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "public" }),
    __metadata("design:type", String)
], Status.prototype, "visibility", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, (sender) => sender.id),
    __metadata("design:type", user_1.User)
], Status.prototype, "sender", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, (receiver) => receiver.id),
    __metadata("design:type", user_1.User)
], Status.prototype, "receiver", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Status.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => like_1.Like, (like) => like.id, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Status.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => imageStatus_1.default, (img) => img.id, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Status.prototype, "images", void 0);
exports.Status = Status = __decorate([
    (0, typeorm_1.Entity)()
], Status);
//# sourceMappingURL=status.js.map