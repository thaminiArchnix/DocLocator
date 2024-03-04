const express = require('express');
const PatientRouter = require('./routes/patientRoutes.js')
const AppointmentRouter = require('./routes/appointmentRoutes.js')

const app = express();
app.use(express.json());

app.use('/patient', PatientRouter)
app.use('/appointment', AppointmentRouter)

app.listen(3000, () => {
    console.log("Server running on port 3000");
})