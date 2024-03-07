const patientModel = require('../../Models/Patient/patientModel.js');
const dateConverter = require('../../Middleware/dateConverter.js');
const bcrypt = require('bcryptjs');


function opStatus (successMsg, successStatus, failMsg, result, res,) {
    if (result === null || result === undefined) {
        return res.status(500).json({ error: failMsg });
    };  
    if (result) {
        return res.status(successStatus).json({
          ...result,
          message: successMsg,
        });
    } 
    
          
};

const patientController = {
    getPatById: async function (req, res) { 
        try {
            const id = req.params.id;
            const tableData = ['PatientId'];
            const result = await patientModel.getById(id, tableData);
            opStatus('Patient Fetched!', 200, 'Cannot Find Patient!', result, res);
            
        } catch (error) {
            res.status(400).json({ error: error.message });
        }

    },

    getAllPats: async function(req, res) {
        try {
            const result = await patientModel.getAll();
            opStatus('Patients Fetched!', 200, 'Cannot Find Patients!', result, res);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    createPatient : async function (req, res) {
        try {
            const patData = req.body;
            //validations 
            //Checking for all data fields
            if (!patData.Name || !patData.Email || !patData.Phone || !patData.DOB || !patData.Longitude || !patData.Latitude || !patData.Gender || !patData.Password ) {
                return res.status(400).json({ error: 'Please fill all fields of the patient form!' });
            }

            const tableData = ['Name', 'Email', 'Phone', 'DOB', 'Longitude', 'Latitude', 'Gender', 'Password'];
            
            //hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(patData.Password, salt);

            patData.Password = hashedPassword;
            const result = await patientModel.create(Object.values(patData), tableData);


            //custom data response
            if (result) {
                res.status(201).json({
                  id: result.insertId,
                  ...patData,
                  message: 'Patient Created Successfully'
                });
            } else {
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    deletePatient: async function (req, res) {
        try {
            const id = req.params.id;
            const tableData = ['PatientId'];
            const result = await patientModel.delete(id, tableData);
            opStatus('Patient Deleted!', 200, 'Cannot Find Patient!', result, res);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    updatePatient: async function (req, res) {
        try {
            const data = req.body;
            const id = req.params.id;
            const tableData = ['Name', 'Email', 'Phone', 'DOB', 'Longitude', 'Latitude', 'Gender', 'Password']
            const idData = 'PatientId';
            array = Object.values(data);
            array.push(id);
            const result = await patientModel.update(array, tableData, idData)
            opStatus('Patient Updated!', 200, 'Cannot Find Patient!', result, res);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

}

module.exports = patientController;