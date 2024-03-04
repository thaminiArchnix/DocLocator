const connection = require('../db/connection.js');

const appointmentController = {
  createAppointment: function(req, res) {
    const { docId, patientId, date, startTime, closedTime, status , longitude ,  latitude, Radius } = req.body;
    const sql = 'INSERT INTO appointment(docId, patientId, date, startTime, closedTime, status , longitude ,  latitude, Radius) VALUES (?, ?, ?, ?, ?, ?, ?, ? , ?)';
    connection.query(sql, [docId, patientId, date, startTime, closedTime, status , longitude ,  latitude, Radius], function(err, result) {
      if (err) {
        res.status(400).json({ error: err.message });
      } else {
        res.status(201).json({ id: result.insertId, message: 'appointment created successfully' });
      }
    });
  },

  getAllAppointments: function(req, res) {
    const sql = 'SELECT * FROM appointment';
    connection.query(sql, function(err, result) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        if (!result || result.length === 0) {
          res.status(404).json({ error: 'No appointment Found' });
        } else {
          res.json(result);
        }
      }
    });
  },

  getAppointmentById: function(req, res) {
    const appId = req.params.id;
    const sql = 'SELECT * FROM appointment WHERE appId = ?';
    connection.query(sql, [appId], function(err, result) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        if (!result || result.length === 0) {
          res.status(404).json({ error: 'appointment not found' });
        } else {
          res.json(result[0]);
        }
      }
    });
  },

  updateAppointment: function(req, res) {
    const appId = req.params.id;
    const { docId, patientId, date, startTime, closedTime, status , longitude ,  latitude, Radius } = req.body;
    const sql = 'UPDATE appointment SET docId = ?, patientId = ?, date = ?, startTime = ?, closedTime = ? , status = ? , longitude = ?, latitude = ?, Radius = ? WHERE appId = ?';
    connection.query(sql, [docId, patientId, date, startTime, closedTime, status , longitude ,  latitude, Radius , appId], function(err, result) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ message: 'appointment Data Updated Successfully' });
      }
    });
  },

  deleteAppointment: function(req, res) {
    const appId = req.params.id;
    const sql = 'DELETE FROM appointment WHERE appId = ?';
    connection.query(sql, [appId], function(err, result) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ message: 'appointment Deleted Successfully' });
      }
    });
  }
};

module.exports = appointmentController;
