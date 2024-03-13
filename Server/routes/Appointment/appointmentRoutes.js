const express = require('express');
const appointmentController = require('../../Controllers/Appointments/appointmentController.js');


const appRouter = express.Router();

appRouter.post('/', appointmentController.createAppointment);
appRouter.get('/:id', appointmentController.getAppById);
appRouter.get('/', appointmentController.getAllApps);
appRouter.delete('/:id', appointmentController.deleteAppointment);
appRouter.put('/:id', appointmentController.updateAppointment);
appRouter.get('/today/now/:id', appointmentController.getAppByDate);

module.exports = appRouter;