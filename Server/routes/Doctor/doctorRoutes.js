const express = require('express');
const doctorController = require('../../Controllers/Doctor/doctorController');


const doctorRouter = express.Router();

doctorRouter.post('/', doctorController.createDoctor);
doctorRouter.get('/:id', doctorController.getDoctorById);
doctorRouter.put('/:id', doctorController.updateDoctor);
doctorRouter.delete('/:id', doctorController.deleteDoctor);

module.exports = doctorRouter;