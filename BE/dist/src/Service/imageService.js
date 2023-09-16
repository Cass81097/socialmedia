"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageService = void 0;
const data_source_1 = require("../data-source");
const image_1 = __importDefault(require("../entity/image"));
class ImageService {
    constructor() {
        this.add = async (image) => {
            return await this.imageRepository.save(image);
        };
        this.findAll = async () => {
            return await this.imageRepository.find({
                relations: {
                    status: true
                }
            });
        };
        this.findAllByStatusId = async (statusId) => {
            return await this.imageRepository.find({
                where: {
                    status: { id: statusId }
                }
            });
        };
        this.delete = async (id) => {
            return await this.imageRepository.delete(id);
        };
        this.update = async (id, image) => {
            return await this.imageRepository.update(id, image);
        };
        this.imageRepository = data_source_1.AppDataSource.getRepository(image_1.default);
    }
}
exports.ImageService = ImageService;
exports.default = new ImageService();
//# sourceMappingURL=imageService.js.map