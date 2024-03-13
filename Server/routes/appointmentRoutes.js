const express = require('express');
const AppointmentRouter = express.Router();
const appointmentController = require('../controllers/appointmentController');

AppointmentRouter.get('/getAppointment', appointmentController.getAllAppointments);
AppointmentRouter.get('/getAppointment/:id', appointmentController.getAppointmentById);
AppointmentRouter.post('/createAppointment', appointmentController.createAppointment);
AppointmentRouter.put('/updateAppointment/:id', appointmentController.updateAppointment);
AppointmentRouter.put('/updateAppointmentStatus/:id', appointmentController.updateAppointmentStatus);
AppointmentRouter.delete('/removeAppointment/:id', appointmentController.deleteAppointment);

module.exports = AppointmentRouter;

