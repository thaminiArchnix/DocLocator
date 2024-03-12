const doctorModel = require("../../Models/Doctor/doctorModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

function opStatus(successMsg, successStatus, failMsg, result, res, token) {
  if (result) {
    let response = {
      ...result,
      message: successMsg,
    };

    if (token) {
      response.token = generateToken({ email: result.email, id: result.id });
    }

    res.status(successStatus).json(response);
  } else {
    res.status(500).json({ error: failMsg });
  }
}
const doctorController = {
  getDoctorById: async function (req, res) {
    try {
      const id = req.params.id;
      const tableData = ["id"];
      const result = await doctorModel.getById(id, tableData);
      opStatus(
        "Doctor Fetched!",
        200,
        "Cannot Find Doctor!",
        result,
        res,
        true
      );
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getAllDoctors: async function (req, res) {
    try {
      const result = await doctorModel.getAll();
      opStatus(
        "Appointments Fetched!",
        200,
        "Cannot Find Appointments!",
        result,
        res
      );
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  createDoctor: async function (req, res) {
    try {
      const appData = req.body;
      //validations
      //Checking for all data fields
      if (
        !appData.full_name ||
        !appData.email ||
        !appData.date_of_birth ||
        !appData.password ||
        !appData.gender ||
        !appData.phone_number ||
        !appData.specialization ||
        !appData.longitude ||
        !appData.latitude
      ) {
        return res
          .status(400)
          .json({ error: "Please fill all fields of the registration form!" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(appData.password, salt);
      const passLength = appData.password.length;
      appData.password = hashedPassword;

      const tableData = [
        "full_name",
        "email",
        "date_of_birth",
        "password",
        "gender",
        "phone_number",
        "specialization",
        "longitude",
        "latitude",
      ];
      const result = await doctorModel.create(
        Object.values(appData),
        tableData
      );

      //custom data response
      if (result) {
        res.status(201).json({
          id: result.insertId,
          ...appData,
          password: passLength,
          token: generateToken({ email: appData.email, id: result.insertId }),
          message: "Doctor Created Successfully",
        });
      } else {
        return res.status(500).json({ error: "Internal Server Error" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteDoctor: async function (req, res) {
    try {
      const id = req.params.id;
      const tableData = ["id"];
      const result = await doctorModel.delete(id, tableData);
      opStatus("Doctor Deleted!", 200, "Cannot Find Doctor!", result, res);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateDoctor: async function (req, res) {
    try {
      const data = req.body;
      const salt = await bcrypt.genSalt(10);
      const oldpass = data.password;
      const hashedPassword = await bcrypt.hash(data.newpass, salt);
      const passLength = data.password.length;
      delete data.newpass;
      data.password = hashedPassword;
      console.log(data);
      const id = req.params.id;
      const tableData = [
        "full_name",
        "email",
        "date_of_birth",
        "password",
        "gender",
        "phone_number",
        "specialization",
        "longitude",
        "latitude",
      ];
      const idData = "id";
      array = Object.values(data);
      array.push(id);

      const response = await doctorModel.getById(id, idData);
      console.log(data.password, response[0].password);

      bcrypt.compare(
        oldpass,
        response[0].password,
        async function (err, result) {
          if (err) {
            res.status(500).json({ error: err.message });
          } else if (result) {
            try {
              const result = await doctorModel.update(array, tableData, idData);

              if (result) {
                res.status(201).json({
                  id: id,
                  ...data,
                  password: passLength,
                  token: generateToken({
                    email: data.email,
                    id: result.insertId,
                  }),
                });
              } else {
                return res.status(500).json({ error: "Internal Server Error" });
              }
            } catch (error) {
              res.status(500).json({ error: error.message });
            }
          }
        }
      );
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  loginDoctor: async function (req, res) {
    try {
      const { email, password } = req.body;

      const doctorData = await doctorModel.getDoctorByEmail(email);

      const doctor = {
        email: email,
        id: doctorData[0].id,
      };
      const token = generateToken(doctor);
      const databasePassword = doctorData[0].password;
      bcrypt.compare(password, databasePassword, function (err, result) {
        if (err) {
          res.status(500).json({ error: err.message });
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
            token: token,
            message: "Logged In Successfully",
          }); //.header('Authorization', 'Bearer ' + token);
        } else {
          res.status(400).json({ error: "Invalid User Data" });
        }
      });
    } catch (error) {
      res.status(500).json({ error: "Invalid User Data" });
    }
  },
};

const generateToken = (doctor) => {
  // doctor{ email, id}
  return jwt.sign(doctor, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = doctorController;
/*
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
            res.json({
                ...result,
                token : generateToken(result.id),
                message : `Doctor Fetched!`
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    loginDoctor: async function(req, res) {
        try {
            const {email, password} = req.body;

            const doctor = {
                email: email,
                id : doctorData[0].id
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
                        token: generateToken(doctor),
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
            if (req.doctor.id === req.params.id) {
                console.log('Token id matched with params id'); //delete this
            }
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





module.exports = doctorController;
*/
