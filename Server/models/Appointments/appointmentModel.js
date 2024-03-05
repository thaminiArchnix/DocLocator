const crudMethods = require('../../Models/crudMethods.js');
const connection = require('../../DB/connection.js');

const appointmentModel = crudMethods('appointment');

module.exports = appointmentModel;