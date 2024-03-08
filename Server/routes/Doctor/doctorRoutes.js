const express = require('express');
const doctorController = require('../../controllers/Doctor/doctorController');


const doctorRouter = express.Router();

doctorRouter.post('/', doctorController.createDoctor);
doctorRouter.get('/', doctorController.getAllDoctors);
doctorRouter.get('/:id', doctorController.getDoctorById);
doctorRouter.put('/:id', doctorController.updateDoctor);
doctorRouter.delete('/:id', doctorController.deleteDoctor);
doctorRouter.post('/login', doctorController.loginDoctor)

module.exports = doctorRouter;