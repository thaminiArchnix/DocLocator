const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv')
const PatientRouter = require('./routes/patientRoutes.js')
const appRouter = require('./routes/Appointment/appointmentRoutes.js')
const doctorRouter =  require('./routes/Doctor/doctorRoutes.js')
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

app.use('/patient', PatientRouter)
app.use('/appointment', appRouter)
app.use('/doctor', doctorRouter)


app.listen(3000, () => {
    console.log("Server running on port 3000");
})