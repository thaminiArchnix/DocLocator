const bcrypt = require("bcryptjs");

async function compareHashedPasswords(password, hashedPassword) {
  console.log(password, hashedPassword);
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    console.error("Error comparing passwords:", error);
    return false;
  }
}

module.exports = compareHashedPasswords;
