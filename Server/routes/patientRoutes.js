const express = require("express");
const PatientRouter = express.Router();
const patientController = require("../controllers/patientController");

PatientRouter.get("/getpatients", patientController.getAllPatients);
PatientRouter.get("/getpatient/:id", patientController.getPatientById);
PatientRouter.post("/createpatient", patientController.createPatient);
PatientRouter.put("/updatepatient/:id", patientController.updatePatient);
PatientRouter.delete("/removepatient/:id", patientController.deletePatient);
PatientRouter.put("/activate", patientController.activatePatient);
PatientRouter.post("/login", patientController.loginPatient);
 
module.exports = PatientRouter;
