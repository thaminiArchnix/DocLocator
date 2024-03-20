const crudMethods = require('../../models/crudMethods.js');
const connection = require('../../db/connection.js');

const appointmentModel = crudMethods('appointment');

module.exports = appointmentModel;