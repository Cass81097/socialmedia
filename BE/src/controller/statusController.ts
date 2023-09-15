import statusService from "../Service/statusService";
import {Request, Response} from "express";
import userService from "../Service/userService";
import {statusRouter} from "../router/statusRouter";


export class StatusController {
    // findAll = async (req, res) => {
    //     let list
    //     if ( req.params.id) {
    //         list = await statusService.findByIdUser( req.params.id)
    //     } else if (req.query.address) {
    //         let list = await statusService.findAll()
    //     }
    //     res.json(list)
    // }

    findAll = async (req, res) => {

        let list = await statusService.findAll()
        console.log(list)
        res.json(list)
    }


    add = async (req, res) => {
        let data = await statusService.add(req.body);
        res.json(200, data)

    }
    // update = async (req, res) => {
    //     let data = await statusService.update(req.params.id, req.body);
    //     res.json(data)
    // }
    delete = async (req, res) => {
        let data = await statusService.delete(req.params.id);
        res.json(data)
    }
    updateContent = async (req: Request, res: Response) => {
        const userId = req.params.id;
        const content = req.body.content;
        console.log(userId,content, 1111)
        let data = await statusService.updateContent(userId, content);
        res.json(data);
    }
    updateVisibility = async (req: Request, res: Response) => {
        const userId = req.params.id;
        const visibility = req.body.visibility;
        let data = await statusService.updateVisibility(userId, visibility);
        res.json(data);
    }
    findAllByIdUser = async (req, res) => {
        const userId = req.params.id;
        let data = await statusService.findByIdUser(userId)
        res.json(data);

    }

}

export default new StatusController()