const crypto = require("crypto");
const nodemailer = require("nodemailer");
const connection = require("../../db/connection.js");

const verifyActivationToken = async (token) => {
  const sql = "SELECT * FROM doctors WHERE verification = ?";
  const params = [token];

  return new Promise((resolve, reject) => {
    connection.query(sql, params, (err, result) => {
      if (err) {
        reject(err);
      } else {
        if (result && result.length > 0) {
          resolve(result[0]);
        } else {
          resolve(null);
        }
      }
    });
  });
};

const activateDoctorAccount = async (req, res) => {
  const token = req.query.token;
  console.log(`token gotten : ${token}`);

  try {
    const doctor = await verifyActivationToken(token);
    if (doctor) {
      const link =
        "<a href='http://localhost:5173/doctor/login'>Go to login page</a>";
      res.send(`Account activated successfully! ${link}`);
    } else {
      res.status(404).send("Invalid activation token");
    }
  } catch (error) {
    console.error("Error activating account:", error);
    res.status(500).send("Internal Server Error");
  }
};

const sendActivationEmail = (patientEmail) => {
  const buffer = crypto.randomBytes(32);
  const token = buffer.toString("hex");
  const activationLink = `http://localhost:3000/auth/activate?token=${token}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "thaminiarchnix@gmail.com",
      pass: "qvli lcfp wgbq wugk",
    },
  });

  const mailOptions = {
    from: "thaminiarchnix@gmail.com",
    to: patientEmail, //change to patient Email
    subject: "Activate Your Account",
    text: `Click the following link to activate your account: ${activationLink}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Activation email sent: " + info.response);
    }
  });
  return token;
};

const verifyDoctorAccount = async (req, res) => {
  try {
    const { email } = req.body;

    const token = await sendActivationEmail(email);

    const sql = "UPDATE doctors SET verification = ? WHERE email = ?";
    const data = [token, email];

    return new Promise((resolve, reject) => {
      connection.query(sql, data, (err, result) => {
        if (err) {
          reject(err);
          res.json({ error: err.message });
        } else {
          if (result) {
            resolve(result[0]);
            res.status(200).json(result);
            console.log("Token added to db");
          } else {
            resolve(null);
          }
        }
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  activateDoctorAccount,
  verifyDoctorAccount,
};
