import {Router} from "express";
import statusController from "../controller/statusController";
import imageController from "../controller/imageController";
export const imageRouter = Router();
imageRouter.delete("/:id", imageController.delete);
imageRouter.post("", imageController.add);
imageRouter.put("/:id", imageController.update);
imageRouter.get("/:id", imageController.findAllByStatusId);