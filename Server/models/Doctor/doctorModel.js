const crudMethods = require('../../Models/crudMethods.js');
const connection = require('../../DB/connection.js');

const doctorModel = crudMethods('doctors');

module.exports = doctorModel;
/*
const createModel = (data, userData) => {
    return {
        [data.modelName]: async function(userData) {
            return new Promise((resolve, reject) => {
                const { sql, params } = data;
                connection.query(sql, params, function(err, result) {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        }
    };
};

const destructure = {full_name, email, date_of_birth, password, gender, phone_number, specialization, longitude, latitude};

const doctorModel = {
    // Create a Doctor
    ...createModel({
        modelName: 'createDoctor',
        sql: 'INSERT INTO doctors (full_name, email, date_of_birth, password, gender, phone_number, specialization, longitude, latitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',

    }, destructure),

    // Get all Doctors
    ...createModel({
        modelName: 'getAllDoctors',
        sql: 'SELECT * FROM doctors',
    }),

    // Get Doctor by ID
    ...createModel({
        modelName: 'getDoctorById',
        sql: 'SELECT * FROM doctors WHERE id = ?',
        
    }, userId),

    // Get Doctor by Email
    ...createModel({
        modelName: 'getDoctorByEmail',
        sql: 'SELECT * FROM doctors WHERE email = ?',
    }, userEmail),

    // Login Doctor
    ...createModel({
        modelName: 'loginDoctor',
        sql: 'SELECT * FROM doctors WHERE email = ? AND password = ?',

    }, {email, password}),

    // Update Doctor
    ...createModel({
        modelName: 'updateDoctor',
        sql: 'UPDATE doctors SET full_name = ?, email = ?, date_of_birth = ?, password = ?, gender = ?, phone_number = ?, specialization = ?, longitude = ?, latitude = ? WHERE id = ?',
    }, destructure),

    // Delete Doctor
    ...createModel({
        modelName: 'deleteDoctor',
        sql: 'DELETE FROM doctors WHERE id = ?',
        params: ['userId']
    }, userId)
};

module.exports = doctorModel;

const doctorModel = {
    createDoctor: async function(userData) {
        return new Promise((resolve, reject) => {
            const { full_name, email, date_of_birth, password, gender, phone_number, specialization, longitude, latitude } = userData;

            const sql = 'INSERT INTO doctors (full_name, email, date_of_birth, password, gender, phone_number, specialization, longitude, latitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
            connection.query(sql, [full_name, email, date_of_birth, password, gender, phone_number, specialization, longitude, latitude], function(err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },

    getAllDoctors: async function() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM doctors';
            connection.query(sql, function(err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },

    getDoctorById: async function(userId) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM doctors WHERE id = ?';
            connection.query(sql, [userId], function(err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },

    getDoctorByEmail: async function(userEmail) {
        return new Promise ((resolve, reject) => {
            const sql = 'SELECT * FROM doctors WHERE email = ?';
            console.log(sql)
            connection.query(sql, [userEmail], function(err, result) {
                if(err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },

    loginDoctor: async function(userData) {
        return new Promise((resolve, reject) => {
            const {email, password} = userData;
            const sql = 'SELECT * FROM doctors WHERE email = ? AND password = ?';
            connection.query(sql, [email, password], function(err, result) {
                if(err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },


    updateDoctor: async function(userId, userData) {
        return new Promise((resolve, reject) => {
            const { full_name, email, date_of_birth, password, gender, phone_number, specialization, longitude, latitude } = userData;
            const sql = 'UPDATE doctors SET full_name = ?, email = ?, date_of_birth = ?, password = ?, gender = ?, phone_number = ?, specialization = ?, longitude = ?, latitude = ? WHERE id = ?';
            connection.query(sql, [full_name, email, date_of_birth, password, gender, phone_number, specialization, longitude, latitude, userId], function(err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },

    deleteDoctor: async function(userId) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM doctors WHERE id = ?';
            connection.query(sql, [userId], function(err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
};

module.exports = doctorModel;
*/