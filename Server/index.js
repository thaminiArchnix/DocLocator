const express = require('express')
const doctorRouter = require('./Routes/Doctor/doctorRoutes')
const cors = require('cors')
const dotenv = require('dotenv');
const appRouter = require('./Routes/Appointment/appointmentRoutes');
const patientRouter = require('./Routes/Patient/patientRoutes');

const app = express();
dotenv.config();

//Middleware
app.use(express.json());
app.use(cors());

//Routes
app.use('/doctor', doctorRouter);
app.use('/app', appRouter);
app.use('/patient', patientRouter);

app.listen(3000, () => {
    console.log("Server running on port 3000");
})