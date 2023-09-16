import {Router} from "express";
import friendShipController from "../controller/friendShipController";
import likeService from "../Service/likeService";
import likeController from "../controller/likeController";
export const likeRouter = Router();

likeRouter.get("/:statusId",likeController.getLikeForStatus)
likeRouter.post("", likeController.addLike);
likeRouter.delete('/:statusId',likeController.deleteLike)

