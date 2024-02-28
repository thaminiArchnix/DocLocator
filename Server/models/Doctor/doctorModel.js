const connection = require('../../DB/connection.js')

const doctorModel = {
  createDoctor: function(userData, callback) {
    const { full_name, email, date_of_birth, password, gender, phone_number, specialization, longitude, latitude } = userData;
    const sql = 'INSERT INTO doctors (full_name, email, date_of_birth, password, gender, phone_number, specialization, longitude, latitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(sql, [full_name, email, date_of_birth, password, gender, phone_number, specialization, longitude, latitude], function(err, result) {
      callback(err, result);
    });
  },

  getAllDoctors: function(callback) {
    const sql = 'SELECT * FROM doctors';
    connection.query(sql, function(err, result) {
      callback(err, result)
    });
  },

  getDoctorById: function(userId, callback) {
    const sql = 'SELECT * FROM doctors WHERE id = ?';
    connection.query(sql, [userId], function(err, result) {
      callback(err, result);
    });
  },

  updateDoctor: function(userId, userData, callback) {
    const { full_name, email, date_of_birth, password, gender, phone_number, specialization, longitude, latitude } = userData;
    const sql = 'UPDATE doctors SET full_name = ?, email = ?, date_of_birth = ?, password = ?, gender = ?, phone_number = ?, specialization = ?, longitude = ?, latitude = ? WHERE id = ?';
    connection.query(sql, [full_name, email, date_of_birth, password, gender, phone_number, text_input, longitude, latitude, userId], function(err, result) {
      callback(err, result);
    });
  },

  deleteDoctor: function(userId, callback) {
    const sql = 'DELETE FROM doctors WHERE id = ?';
    connection.query(sql, [userId], function(err, result) {
      callback(err, result);
    });
  }
};

module.exports = doctorModel;
