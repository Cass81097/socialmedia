import friendShipService from "../Service/friendShipService";
import likeService from "../Service/likeService";
import {FriendShipController} from "./friendShipController";

export  class LikeController {
    addLike = async (req, res) => {

        let data = await likeService.save(req.params.statusId,req.body.userId)

        res.json(data);
    }

    deleteLike = async (req, res) => {
        const del = await likeService.delete(req.params.statusId,req.body.userId)

        res.json(del)
    }
    getLikeForStatus = async (req,res) => {
        const list = await likeService.getLikeForStatus(req.params.id)
        res.status(200).json(list)
    }

}
export default new LikeController()