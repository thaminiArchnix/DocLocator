const doctorModel = require('../../Models/Doctor/doctorModel.js')

const doctorController = {
    createDoctor: function(req, res) {
        doctorModel.createDoctor(req.body, function(err, result) {
            if (err) {
                return res.status(400).json({error: err.message});
            }
            res.status(201).json({ id: result.insertId, message : 'Doctor created successfully'})
        })
    },

    getAllDoctors: function(req, res) {
        doctorModel.getAllDoctors(function(err, result) {
            if(err) {
                return res.status(500).json({ error: err.message});
            }
            if(!result || result.length === 0) {
                return res.status(404).json({ error : 'No Doctors Found'});
            }''
            res.status(201).json(result)
        })
    },

    getDoctorById: function(req, res) {
        doctorModel.getDoctorById(req.body, function(err, result) {
            if(err) {
                return res.status(500).json({ error: err.message});
            }
            if (!result || result.length === 0) {
                return res.status(404).json({ error: 'Doctor not found'});
            }
            res.json(result[0]);
        });
    },

    updateDoctor: function(req, res) {
        doctorModel.updateDoctor(req.params.id, req.body, function(err, result) {
            if(err) {
                return res.status(500).json({ error: err.message});
            }
            res.json({ message: 'Doctor Data Updated Successfully'});
        })
    },

    deleteDoctor: function (req, res) {
        doctorModel.deleteDoctor(req.params.id, function (err, result) {
            if(err) {
                return res.status(500).json({error: err.message})
            }
            res.json({ message: 'Doctor Deleted Successfully'})
        })
    }
}

module.exports = doctorController;