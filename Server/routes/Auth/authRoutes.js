const express = require("express");
const authRouter = express.Router();
const authController = require("../../controllers/Auth/authController.js");

authRouter.get("/activate", authController.activateDoctorAccount);
authRouter.post("/verify", authController.verifyDoctorAccount);
authRouter.get("/activatePatient", authController.activatePatientAccount);
authRouter.post("/verifyPatient", authController.verifyPatientAccount);
authRouter.post("/authUser", authController.authenticateUser);

module.exports = authRouter;
