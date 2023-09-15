import {Router} from "express";
import friendShipController from "../controller/friendShipController";

import statusController from "../controller/statusController";
export const statusRouter = Router();

statusRouter.get("/",statusController.show)


