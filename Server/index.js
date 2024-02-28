const express = require('express')
const doctorRouter = require('./Routes/Doctor/doctorRoutes')

const app = express();

//Middleware
app.use(express.json());

//Routes
app.use('/doctor', doctorRouter);

app.listen(3000, () => {
    console.log("Server running on port 3000");
})