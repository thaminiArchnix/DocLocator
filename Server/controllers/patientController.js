const connection = require("../db/connection.js");
const activationService = require("../Services/activationService.js");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

const patientController = (() => {
  const executeQuery = (
    sql,
    params,
    successMessage,
    errorMessage,
    req,
    res
  ) => {
    connection.query(sql, params, function (err, result) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        if (!result || result.length === 0) {
          res.status(404).json({ error: errorMessage });
        } else {
          if (successMessage) {
            res.status(201).json({
              id: result.insertId,
              ...result,
              message: successMessage,
            });
          } else {
            res.json(result);
          }
        }
      }
    });
  };

  const createPatient = async (req, res) => {
    const {
      Name,
      Email,
      Phone,
      DOB,
      Longitude,
      Latitude,
      Gender,
      Password,
      ConfirmPassword,
    } = req.body;

    if (Password !== ConfirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);
    const activationToken = activationService.generateActivationToken();

    const sql =
      "INSERT INTO patient(Name, Email, Phone, DOB, Longitude, Latitude, Gender, Password, activation_token) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const params = [
      Name,
      Email,
      Phone,
      DOB,
      Longitude,
      Latitude,
      Gender,
      hashedPassword,
      activationToken,
    ];

    const successMessage =
      "Patient created successfully. Check your email for activation instructions.";
    const errorMessage = "Patient not created";

    connection.query(sql, params, function (err, result) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        if (!result || result.length === 0) {
          res.status(404).json({ error: errorMessage });
        } else {
          if (successMessage) {
            res.status(201).json({
              id: result.insertId,
              email: Email,

              message: successMessage,
            });
          } else {
            res.json(result);
          }
        }
      }
    });

    const patientEmail = Email;
    //activationService.sendActivationEmail(patientEmail, activationToken);
  };

  const getAllPatients = (req, res) => {
    const sql = "SELECT * FROM patient";
    executeQuery(sql, [], null, "No Patient Found", req, res);
  };

  const getPatientById = (req, res) => {
    const PatientId = req.params.id;
    const sql = "SELECT * FROM patient WHERE PatientId = ?";
    const params = [PatientId];
    executeQuery(sql, params, null, "Patient not found", req, res);
  };

  const updatePatient = async (req, res) => {
    const PatientId = req.params.id;
    const {
      Name,
      Email,
      Phone,
      DOB,
      Gender,
      Password,
      Latitude,
      Longitude,
      activation_token,
      newpass,
    } = req.body;

    const sql = "SELECT Password FROM patient WHERE PatientId = ?";
    connection.query(sql, [PatientId], async (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (!result || !result[0]) {
        return res.status(404).json({ error: "Patient not found" });
      }

      const hashedPassword = result[0].Password;

      const passwordMatch = await bcrypt.compare(Password, hashedPassword);
      if (!passwordMatch) {
        return res.status(400).json({ error: "Incorrect current password" });
      }

      const hashedNewPassword = await bcrypt.hash(newpass, 10);
      //console.log(hashedNewPassword);

      const updateSql =
        "UPDATE patient SET Name = ?, Phone = ?, DOB = ?, Gender = ?, Password = ? WHERE PatientId = ?";
      const params = [Name, Phone, DOB, Gender, hashedNewPassword, PatientId];

      connection.query(updateSql, params, function (err, result) {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          if (!result || result.length === 0) {
            res.status(404).json({ error: errorMessage });
          } else {
            if (result) {
              res.status(201).json({
                0: {
                  PatientId: PatientId,
                  DOB: DOB,
                  Email: Email,
                  Name: Name,
                  Gender: Gender,
                  Phone: Phone,
                  Password: hashedNewPassword,
                  Latitude: Latitude,
                  Longitude: Longitude,
                  activation_token: activation_token,
                },
                token: generateToken(PatientId),
                message: "User Updated Successfully",
              });
            } else {
              res.json("Error Updating Profile!!");
            }
          }
        }
      });
    });
  };

  const deletePatient = (req, res) => {
    const PatientId = req.params.id;
    console.log("Deleting patient with ID:", PatientId);
    const sql = "DELETE FROM patient WHERE PatientId = ?";
    const params = [PatientId];
    executeQuery(sql, params, "Patient Deleted Successfully", null, req, res);
  };

  const activatePatient = async (req, res) => {
    const { token } = req.params;

    try {
      const user = await activationService.verifyActivationToken(token);

      if (!user) {
        return res.status(400).json({ error: "Invalid activation link" });
      }

      const sql =
        "UPDATE patient SET activation_status = 1 WHERE PatientId = ?";
      const params = [user.PatientId];

      executeQuery(
        sql,
        params,
        "Account Activated Successfully",
        "Error activating account",
        req,
        res
      );

      // Send the redirection URL in the response
      //  res.json({ redirectUrl: '/patient/dashboard' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  const loginPatient = async (req, res) => {
    try {
      const { Email, Password } = req.body;
      const sql = "SELECT * FROM patient WHERE Email = ?";
      const params = [Email];
      console.log("Posted to db");
      // executeQuery(
      //   sql,
      //   params,
      //   null,
      //   "Invalid User Data",
      //   req,
      //   res,
      // );

      connection.query(sql, params, async function (err, result) {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        if (!result || result.length === 0) {
          res.status(404).json("Error");
          return;
        }
        if (result) {
          const databasePassword = result[0].Password;
          const match = await bcrypt.compare(Password, databasePassword);
          console.log(match);
          if (match) {
            const id = result[0].PatientId;

            const token = generateToken(id);
            console.log(result);

            res.status(201).json({
              ...result,
              token: token,
              message: "Logged In Successfully",
            });
          } else {
            res.status(400).json({ error: "Invalid User Data" });
          }
        }
      });

      //  console.log(result);
      //   const databasePassword = patientData[0].Password;
      //     const result = await bcrypt.compare(Password, databasePassword);
      //     console.log('executes');

      // if (result) {
      //   const patientId = patientData[0].PatientId;
      //   const token = generateToken(patientId);
      //   console.log(token);

      //   res.status(201).json({
      //     patientId,
      //     Name: patientData[0].Name,
      //     Email: patientData[0].Email,
      //     DOB: patientData[0].DOB,
      //     Phone: patientData[0].Phone,
      //     token,
      //     message: "Logged In Successfully",
      //   });
      // } else {
      //   res.status(400).json({ error: "Invalid User Data" });
      // }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  const generateToken = (id) => {
    return jsonwebtoken.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
  };

  return {
    createPatient,
    getAllPatients,
    getPatientById,
    updatePatient,
    deletePatient,
    activatePatient,
    loginPatient,
    generateToken,
  };
})();

module.exports = patientController;
