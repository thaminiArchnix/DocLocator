const express = require("express");
const authRouter = express.Router();
const authController = require("../../controllers/Auth/authController.js");

authRouter.get("/activate", authController.activateDoctorAccount);
authRouter.post("/verify", authController.verifyDoctorAccount);

module.exports = authRouter;
