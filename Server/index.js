const express = require('express');
const PatientRouter = require('./routes/patientRoutes.js')

const app = express();

app.use(express.json());

app.use('/patient', PatientRouter)

app.listen(3000, () => {
    console.log("Server running on port 3000");
})