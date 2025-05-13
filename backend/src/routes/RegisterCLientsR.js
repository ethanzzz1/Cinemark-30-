import express from "express";
import registerClients from "../controllers/registerClients.js";
const router = express.Router();

router.route("/").post(registerClients.register);
router.route("/verifyCodeEmail").post(registerClients.verificationCode);


export default router;