import {
    createCategory,
    editCategory,
    fetchallHabit,
    deleteHabit
} from "../controllers/category.controller.js";

import { Router } from "express";

const router = Router()

router.route('/')
    .post(createCategory)
    .get(fetchallHabit)

router.route('/:id')
    .patch(editCategory)
    .delete(deleteHabit)

export default router