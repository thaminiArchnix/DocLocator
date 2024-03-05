const doctorModel = require('../../Models/Doctor/doctorModel.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const doctorController = {
    createDoctor: async function(req, res) {
        try {
            
            const {full_name, email, date_of_birth, password, gender, phone_number, specialization, longitude, latitude} = req.body;

            //validate availability of data in all required fields
            if (!full_name || !email || !date_of_birth || !password || !gender || !phone_number || !specialization || !longitude || !latitude) {
                res.status(400).json({ error: 'Please fill all the fields!'})
            }

            //hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            //---------handle date of birth?
            //---------handle longitude and latitude?
            //---------handle phone number

            //create User data to be stored
            const doctorData = {
                full_name : full_name,
                email : email,
                date_of_birth : date_of_birth,
                password : hashedPassword,
                gender : gender,
                phone_number : phone_number,
                specialization : specialization,
                longitude : longitude,
                latitude : latitude,
            };

            //create entry in doctor table
            const result = await doctorModel.createDoctor(doctorData);
            
            if (result) {
                res.status(201).json({
                  id: result.insertId,
                  full_name: full_name,
                  email: email,
                  date_of_birth: date_of_birth,
                  password: hashedPassword,
                  gender: gender,
                  phone_number: phone_number,
                  specialization: specialization,
                  longitude: longitude,
                  latitude: latitude,
                  token: generateToken(result.insertId),
                  message: 'Doctor Created Successfully'
                });
            } else {
                res.status(400).json({ error: 'Invalid User Data' })
                
            }
            
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
            const {email, password} = req.body;

            const doctor = {
                email: email,
                password: password
            };
            
            const doctorData = await doctorModel.getDoctorByEmail(email);
            
            const databasePassword = doctorData[0].password;
            bcrypt.compare(password, databasePassword, function(err, result) {
                if (err) {
                    res.status(500).json({ error : err.message })
                } else if (result) {
                    
                    res.status(201).json({
                        id: doctorData[0].id,
                        full_name: doctorData[0].full_name,
                        email: doctorData[0].email,
                        date_of_birth: doctorData[0].date_of_birth,
                        password: password.length,
                        gender: doctorData[0].gender,
                        phone_number: doctorData[0].phone_number,
                        specialization: doctorData[0].specialization,
                        longitude: doctorData[0].longitude,
                        latitude: doctorData[0].latitude,
                        token: generateToken(doctorData[0].id),
                        message: 'Logged In Successfully'
                      });
                    
                } else {
                    res.status(400).json({ error: 'Invalid User Data' });
                }
            });
        } catch (error) {
            res.status(500).json({ error: 'Invalid User Data' });
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
    },

    
};


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
}

module.exports = doctorController;