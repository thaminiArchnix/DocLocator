const crudMethods = require('../crudMethods.js')
const connection = require('../../db/connection.js');

const appointmentModel = crudMethods('appointment');

module.exports = appointmentModel;