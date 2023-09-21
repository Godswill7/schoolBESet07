import express from "express"

import { createClass, deleteClass, viewAClass, viewAllClass } from "../controller/classController"

const router = express.Router()

router.route("/create-class").post(createClass)
router.route("/all-class").get(viewAllClass)
router.route("/:classID/class").get(viewAClass)
router.route("/:classID/class").delete(deleteClass)


export default router