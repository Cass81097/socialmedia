import {Router} from "express";
import friendShipController from "../controller/friendShipController";
import likeService from "../Service/likeService";
import likeController from "../controller/likeController";
export const LikeRouter = Router();

LikeRouter.get("/:statusId",likeController.getLikeForStatus)
LikeRouter.post('add-likes/:statusId', likeController.addLike);
LikeRouter.delete('/:statusId',likeController.deleteLike)

