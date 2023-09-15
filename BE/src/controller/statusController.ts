import {Request, Response} from "express";
import userService from "../Service/userService";
import statusService from "../Service/statusService";


export class StatusController {

    show = async (req: Request, res: Response) => {
        let data = await statusService.getStatus();
        res.json(data);
    }

}
export default new StatusController()