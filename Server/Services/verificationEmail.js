const crypto = require("crypto");
const nodemailer = require("nodemailer");

const generateActivationToken = () => {
  const buffer = crypto.randomBytes(32);
  const token = buffer.toString("hex");
  return token;
};

const sendActivationEmail = (patientEmail, token) => {
  const activationLink = `http://localhost:3000/doctor/activate?token=${token}`;
  //const activationLink = `http://localhost:3000/patient/dashboard`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "thaminiarchnix@gmail.com",
      pass: "thaminiArchnixDemo@March",
    },
  });

  const mailOptions = {
    from: "thaminiarchnix@gmail.com",
    to: patientEmail,
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
};

const verifyActivationToken = async (token) => {
  const sql = "SELECT * FROM doctor WHERE verification = ?";
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

module.exports = {
  generateActivationToken,
  sendActivationEmail,
  verifyActivationToken,
};
