
import imageService from "../Service/imageService";
import statusService from "../Service/statusService";

export class ImageController{
    add = async (req, res) => {
        let data = await imageService.add(req.body);
        res.json(200, data)

    }
    update = async (req, res) => {
        console.log(req.params.id,req.body,1111 )
        let data = await imageService.update(req.params.id, req.body);
        res.json(data)
    }
    delete = async (req, res) => {
        let data = await imageService.delete(req.params.id);
        res.json(data)
    }
    findAllByStatusId =async (req, res)=>{
        return await imageService.findAllByStatusId(req.params.id)
    }
}
export default new ImageController()