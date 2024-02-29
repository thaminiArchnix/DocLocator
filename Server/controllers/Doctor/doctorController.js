const doctorModel = require('../../Models/Doctor/doctorModel.js')

const doctorController = {
    createDoctor: async function(req, res) {
        try {
            const result = await doctorModel.createDoctor(req.body);
            res.status(201).json({ id: result.insertId, message : 'Doctor created successfully'});
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    getAllDoctors: async function(req, res) {
        try {
            const result = await doctorModel.getAllDoctors();
            if (!result || result.length === 0) {
                return res.status(404).json({ error : 'No Doctors Found'});
            }
            res.status(201).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getDoctorById: async function(req, res) {
        try {
            const result = await doctorModel.getDoctorById(req.params.id);
            if (!result || result.length === 0) {
                return res.status(404).json({ error : 'User does not exist'});
            }
            res.json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    loginDoctor: async function(req, res) {
        try {
            const result = await doctorModel.loginDoctor(req.body);
            if (!result || result.length === 0) {
                return res.status(404).json({error : 'Wrong email or password'})
            }
            res.json(result);
        } catch (error) {
            res.status(500).json({ error : err.message });
        }
    },

    updateDoctor: async function(req, res) {
        try {
            await doctorModel.updateDoctor(req.params.id, req.body);
            res.json({ message: 'Doctor Data Updated Successfully'});
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    deleteDoctor: async function(req, res) {
        try {
            await doctorModel.deleteDoctor(req.params.id);
            res.json({ message: 'Doctor Deleted Successfully'});
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};


module.exports = doctorController;