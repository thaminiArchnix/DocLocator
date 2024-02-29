const connection = require('../db/connection.js');

const patientController = {
  createPatient: function(req, res) {
    const { Name, Email, Phone, DOB, Longitude, Latitude, Gender, Password } = req.body;
    const sql = 'INSERT INTO patient(Name, Email, Phone, DOB, Longitude, Latitude, Gender, Password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(sql, [Name, Email, Phone, DOB, Longitude, Latitude, Gender, Password], function(err, result) {
      if (err) {
        res.status(400).json({ error: err.message });
      } else {
        res.status(201).json({ id: result.insertId, message: 'Patient created successfully' });
      }
    });
  },

  getAllPatients: function(req, res) {
    const sql = 'SELECT * FROM patient';
    connection.query(sql, function(err, result) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        if (!result || result.length === 0) {
          res.status(404).json({ error: 'No Patient Found' });
        } else {
          res.json(result);
        }
      }
    });
  },

  getPatientById: function(req, res) {
    const PatientId = req.params.id;
    const sql = 'SELECT * FROM patient WHERE PatientId = ?';
    connection.query(sql, [PatientId], function(err, result) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        if (!result || result.length === 0) {
          res.status(404).json({ error: 'Patient not found' });
        } else {
          res.json(result[0]);
        }
      }
    });
  },

  updatePatient: function(req, res) {
    const PatientId = req.params.id;
    const { Name, Email, Phone, DOB, Longitude, Latitude, Gender, Password } = req.body;
    const sql = 'UPDATE patient SET Name = ?, Email = ?, Phone = ?, DOB = ?, Longitude = ?, Latitude = ?, Gender = ?, Password = ? WHERE PatientId = ?';
    connection.query(sql, [Name, Email, Phone, DOB, Longitude, Latitude, Gender, Password, PatientId], function(err, result) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ message: 'Patient Data Updated Successfully' });
      }
    });
  },

  deletePatient: function(req, res) {
    const PatientId = req.params.id;
    const sql = 'DELETE FROM patient WHERE PatientId = ?';
    connection.query(sql, [PatientId], function(err, result) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ message: 'Patient Deleted Successfully' });
      }
    });
  }
};

module.exports = patientController;
