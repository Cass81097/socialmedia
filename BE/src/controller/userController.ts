import {Request, Response} from "express";
import userService from "../Service/userService";


export class UserController {
    register = async (req: Request, res: Response) => {
        const user = await userService.register(req.body);
        res.status(201).json({ message: user, userId: user.id });
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

    findByUserName = async (req,res)=>{
        let result = await userService.findByUserName(req.params.username)
        res.json(result)
    }

    findAllUserName = async (req,res)=>{
        let result = await userService.findAllUserName()
        res.json(result)
    }

}
export default new UserController()