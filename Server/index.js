const express = require('express')
const doctorRouter = require('./Routes/Doctor/doctorRoutes')
const cors = require('cors')

const app = express();

//Middleware
app.use(express.json());
app.use(cors());

//Routes
app.use('/doctor', doctorRouter);

app.listen(3000, () => {
    console.log("Server running on port 3000");
})