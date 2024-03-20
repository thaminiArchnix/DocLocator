const express = require('express');
const appointmentController = require('../../controllers/Appointments/appointmentController.js');


const appRouter = express.Router();

appRouter.post('/', appointmentController.createAppointment);
appRouter.get('/:id', appointmentController.getAppById);
appRouter.get('/', appointmentController.getAllApps);
appRouter.get('/doctor/:docId', appointmentController.getAppointmentsForDoctor); 
appRouter.delete('/:id', appointmentController.deleteAppointment);
appRouter.put('/:id', appointmentController.updateAppointment);
appRouter.get('/today/now/:id', appointmentController.getAppByDate);
appRouter.post('/createAppointment', appointmentController.createAppointment);

module.exports = appRouter;