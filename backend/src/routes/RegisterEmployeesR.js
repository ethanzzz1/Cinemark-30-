import express from "express";
import employeesController from "../controllers/employeesController.js";

const router = express.Router();

router.route("/").post(employeesController.register)

export default router;