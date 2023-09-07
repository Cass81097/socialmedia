import e, {Request, Response} from "express";
import userService from "../Service/userService";


export class UserController {
    register = async (req: Request, res: Response) => {
        await userService.register(req.body);
        res.status(201).json('Create user success')
    }

    login = async (req: Request, res: Response) => {
        let resultCheck = await userService.checkUser(req.body);
        res.status(200).json(resultCheck);
    }
    update = async (req: Request, res: Response) => {
        let data = await userService.update(req.params.id, req.body);
        console.log(req.params.id, req.body);
        res.json(data);
    }
    findAll = async (req,res)=>{
        let list = await userService.findAll()
        res.json(list)
    }
}
export default new UserController()