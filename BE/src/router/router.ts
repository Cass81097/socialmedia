import {Router} from "express";
import {userRouter} from "./userRouter";
import {friendShipRouter} from "./friendShipRouter";
import {LikeRouter} from "./likeRouter";
import {statusRouter} from "./statusRouter";
const router = Router();

router.use('/users', userRouter);
router.use('/friendShips',friendShipRouter );
router.use('/likes',LikeRouter)
router.use('/status',statusRouter)
export default router;