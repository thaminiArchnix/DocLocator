const express = require("express");
const doctorRouter = require("./routes/Doctor/doctorRoutes.js");
const cors = require("cors");
const dotenv = require("dotenv");
const appRouter = require("./Routes/Appointment/appointmentRoutes");
const patientRouter = require("./Routes/Patient/patientRoutes");
const authRouter = require("./routes/Auth/authRoutes.js");

const app = express();
dotenv.config();

//Middleware
app.use(express.json());
app.use(cors());

//Routes
app.use("/doctor", doctorRouter);
app.use("/app", appRouter);
app.use("/patient", patientRouter);
app.use("/auth", authRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
