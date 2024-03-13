const express = require('express');
const patientController = require('../../Controllers/Patient/patientController.js')


const patientRouter = express.Router();

patientRouter.post('/', patientController.createPatient);
patientRouter.get('/:id', patientController.getPatById);
patientRouter.get('/', patientController.getAllPats);
patientRouter.delete('/:id', patientController.deletePatient);
patientRouter.put('/:id', patientController.updatePatient);


module.exports = patientRouter;