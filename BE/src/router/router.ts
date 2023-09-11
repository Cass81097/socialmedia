import {Router} from "express";
import {userRouter} from "./userRouter";
import {friendShipRouter} from "./friendShipRouter";
const router = Router();

router.use('/users', userRouter);
router.use('/friendShips',friendShipRouter );
export default router;