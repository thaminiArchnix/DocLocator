const connection = require('../db/connection.js');
const activationService = require('../services/activationService.js');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const patientController = (() => {
    const executeQuery = (sql, params, successMessage, errorMessage, req, res) => {
      connection.query(sql, params, function (err, result) {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          if (!result || result.length === 0) {
            res.status(404).json({ error: errorMessage });
          } else {
            if (successMessage) {
              res.status(201).json({ id: result.insertId,...result , message: successMessage });
            } else {
              res.json(result);
            }
          }
        }
      });
    };

    const createPatient = async (req, res) => {
      const { Name, Email, Phone, DOB, Longitude, Latitude, Gender, Password, ConfirmPassword } = req.body;

      if (Password !== ConfirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
      }

      const hashedPassword = await bcrypt.hash(Password, 10);
      const activationToken = activationService.generateActivationToken();

      const sql = 'INSERT INTO patient(Name, Email, Phone, DOB, Longitude, Latitude, Gender, Password, activation_token) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
      const params = [Name, Email, Phone, DOB, Longitude, Latitude, Gender, hashedPassword, activationToken];

      const successMessage = 'Patient created successfully. Check your email for activation instructions.';
      const errorMessage = 'Patient not created';

      executeQuery(sql, params, successMessage, errorMessage, req, res);

      const patientEmail = Email;
      activationService.sendActivationEmail(patientEmail, activationToken);
    };



    const getAllPatients = (req, res) => {
      const sql = 'SELECT * FROM patient';
      executeQuery(sql, [], null, 'No Patient Found', req, res);
    };



    const getPatientById = (req, res) => {
      const PatientId = req.params.id;
      const sql = 'SELECT * FROM patient WHERE PatientId = ?';
      const params = [PatientId];
      executeQuery(sql, params, null, 'Patient not found', req, res);
    };



    const updatePatient = (req, res) => {
      const PatientId = req.params.id;
      const { Name, Email, Phone, DOB, Longitude, Latitude, Gender, Password } = req.body;
      const sql = 'UPDATE patient SET Name = ?, Email = ?, Phone = ?, DOB = ?, Longitude = ?, Latitude = ?, Gender = ?, Password = ? WHERE PatientId = ?';
      const params = [Name, Email, Phone, DOB, Longitude, Latitude, Gender, Password, PatientId];
      executeQuery(sql, params, 'Patient Data Updated Successfully', null, req, res);
    };




    const deletePatient = (req, res) => {
      const PatientId = req.params.id;
      const sql = 'DELETE FROM patient WHERE PatientId = ?';
      const params = [PatientId];
      executeQuery(sql, params, 'Patient Deleted Successfully', null, req, res);
    };


    

    const activatePatient = async (req, res) => {
      const { token } = req.params;
    
      try {
        const user = await activationService.verifyActivationToken(token);
    
        if (!user) {
          return res.status(400).json({ error: 'Invalid activation link' });
        }
    
        const sql = 'UPDATE patient SET activation_status = 1 WHERE PatientId = ?';
        const params = [user.PatientId];
    
        executeQuery(
          sql,
          params,
          'Account Activated Successfully',
          'Error activating account',
          req,
          res
        );
    
        // Send the redirection URL in the response
      //  res.json({ redirectUrl: '/patient/dashboard' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };




    const loginPatient = async (req, res) => {
      try {
        const { Email, Password } = req.body;
    
        const sql = 'SELECT * FROM patient WHERE Email = ?';
        const params = [Email];
    
        executeQuery(sql, params, null, 'Invalid User Data', req, res, async (patientData) => {
          const databasePassword = patientData[0].Password;
          const result = await bcrypt.compare(Password, databasePassword);
    
          if (result) {
            const patientId = patientData[0].PatientId;
            const token = generateToken(patientId);
    
            res.status(201).json({
              patientId,
              Name: patientData[0].Name,
              Email: patientData[0].Email,
              DOB: patientData[0].DOB,
              Phone: patientData[0].Phone,
              token,
              message: 'Logged In Successfully',
            });
          } else {
            res.status(400).json({ error: 'Invalid User Data' });
          }
        });
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };
    


  
    const generateToken = (patientId) => {
      return jwt.sign({ patientId }, process.env.JWT_SECRET, {
        expiresIn: '1d',
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
      generateToken
    };
  })();
  
  module.exports = patientController;
