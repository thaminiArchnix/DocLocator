const express = require("express");
const doctorController = require("../../controllers/Doctor/doctorController.js");
const { protect } = require("../../Middleware/userAuth.js");

const doctorRouter = express.Router();

doctorRouter.post("/", doctorController.createDoctor);
doctorRouter.get("/", doctorController.getAllDoctors);
doctorRouter.get("/:id", doctorController.getDoctorById);
doctorRouter.put("/:id", protect, doctorController.updateDoctor);
doctorRouter.delete("/:id", protect, doctorController.deleteDoctor);
doctorRouter.post("/login", doctorController.loginDoctor);

module.exports = doctorRouter;
