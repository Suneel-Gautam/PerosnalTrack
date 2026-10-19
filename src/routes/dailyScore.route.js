import {
    createDailyScore,
    deleteDailyScore,
    editDailyScore,
    fetchAllDailyScore,
    fetchUserdailyScore
} from "../controllers/dailyScore.controller.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";

import { Router } from "express";

const router = Router()

router.route('/').post(
    jwtVerify,
    createDailyScore
)
router.route('/:id').delete(
    deleteDailyScore
)
router.route('/:id').patch(
    editDailyScore
)
router.route('/').get(
    fetchAllDailyScore
)
router.route('/me').get(
    jwtVerify,
    fetchUserdailyScore
)


export default router