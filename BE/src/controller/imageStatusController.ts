
import ImageStatusService from "../Service/imageStatusService";
import statusService from "../Service/statusService";

export class ImageStatusController {

    findAll = async (req, res) => {
        let data = await ImageStatusService.findAll()
        res.json(data)
    }

    add = async (req, res) => {
        let data = await ImageStatusService.add(req.body);
        res.json(200, data)

    }
    update = async (req, res) => {
        console.log(req.params.id,req.body,1111 )
        let data = await ImageStatusService.update(req.params.id, req.body);
        res.json(data)
    }
    delete = async (req, res) => {
        let data = await ImageStatusService.delete(req.params.id);
        res.json(data)
    }

    findAllByStatusId =async (req, res)=>{
        let data = await ImageStatusService.findAllByStatusId(req.params.id)       
        res.json(data);
    }
}
export default new ImageStatusController()