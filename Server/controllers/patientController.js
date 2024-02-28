const { Patient } = require('../models/patientModel'); 


const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getPatientById = async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await Patient.findByPk(id);
    if (!patient) {
      res.status(404).json({ error: 'Patient not found' });
    } else {
      res.json(patient);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createPatient = async (req, res) => {
  const { Name, Email, Phone, DOB, Longitude, Latitude, Gender, Password } = req.body;
  try {
    const patient = await Patient.create({
      Name,
      Email,
      Phone,
      DOB,
      Longitude,
      Latitude,
      Gender,
      Password,
    });
    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updatePatient = async (req, res) => {
  const { id } = req.params;
  const { Name, Email, Phone, DOB, Longitude, Latitude, Gender, Password } = req.body;
  try {
    const patient = await Patient.findByPk(id);
    if (!patient) {
      res.status(404).json({ error: 'Patient not found' });
    } else {
      await patient.update({
        Name,
        Email,
        Phone,
        DOB,
        Longitude,
        Latitude,
        Gender,
        Password,
      });
      res.json(patient);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deletePatient = async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await Patient.findByPk(id);
    if (!patient) {
      res.status(404).json({ error: 'Patient not found' });
    } else {
      await patient.destroy();
      res.json({ message: 'Patient deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
};
