import {Router} from "express";
import statusController from "../controller/statusController";
import userController from "../controller/userController";
import {userRouter} from "./userRouter";

export const statusRouter = Router();
statusRouter.get("/", statusController.findAll);
statusRouter.get("/:id", statusController.findAllByIdUser);
statusRouter.delete("/:id", statusController.delete);
statusRouter.post("", statusController.add);
statusRouter.put('/content/:id', statusController.updateContent);
statusRouter.put('/visibility/:id', statusController.updateVisibility);
