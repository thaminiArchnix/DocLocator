// controllers/authController.js
const {
  sendActivationEmail,
  verifyActivationToken,
} = require("../../Services/verificationEmail.js");

// Controller to handle activation link
const activateDoctorAccount = async (req, res) => {
  const token = req.query.token;

  try {
    const doctor = await verifyActivationToken(token);
    if (doctor) {
      // Here you can activate the account in the database
      res.send("Account activated successfully");
    } else {
      res.status(404).send("Invalid activation token");
    }
  } catch (error) {
    console.error("Error activating account:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  activateDoctorAccount,
};
