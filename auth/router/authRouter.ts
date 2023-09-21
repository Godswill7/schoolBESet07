import express from "express"
import { createStudent, getAllStudent, getOneStudent, signInStudent, verifyStudent } from "../controller/studentAuthController"

const router = express.Router()

router.route("/create").post(createStudent)
router.route("/:studentID/verify").get(verifyStudent)
router.route("/sign-in").post(signInStudent)
router.route("/all-students").get(getAllStudent)
router.route("/:studentID/student").get(getOneStudent)


export default router