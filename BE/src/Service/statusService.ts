import {AppDataSource} from "../data-source";
import {Like} from "typeorm";
import {Status} from "../entity/status";

export  class StatusService {
    private statusRepository;

    constructor() {
        this.statusRepository = AppDataSource.getRepository(Status)
    }

    getStatus = async () => {
        try {
            const list =  await this.statusRepository.find({
                relations: {
                    user: true,
                },
            })
           return list
        }
        catch (e){
            console.log(e)
        }
    }
}
export default new StatusService()