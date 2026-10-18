import { Router } from "express";
import {
    createHabit,
    deleteHabit,
    editHabit,
    fetchAllHabits,
    fetchUserHabit
} from "../controllers/habit.controller.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";

const router = Router()

router.route('/').post(
    jwtVerify,
    createHabit
)
router.route('/:id').delete(
    jwtVerify,
    deleteHabit
)
router.route('/:id').patch(
    jwtVerify,
    editHabit
)
router.route('/').get(
    fetchAllHabits
)
router.route('/me').get(
    jwtVerify,
    fetchUserHabit
)



export default router