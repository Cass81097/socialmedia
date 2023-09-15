"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusService = void 0;
const data_source_1 = require("../data-source");
const status_1 = require("../entity/status");
class StatusService {
    constructor() {
        this.getStatus = async () => {
            try {
                const list = await this.statusRepository.find({
                    relations: {
                        user: true,
                    },
                });
                return list;
            }
            catch (e) {
                console.log(e);
            }
        };
        this.statusRepository = data_source_1.AppDataSource.getRepository(status_1.Status);
    }
}
exports.StatusService = StatusService;
exports.default = new StatusService();
//# sourceMappingURL=statusService.js.map