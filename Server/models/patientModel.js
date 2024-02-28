const Sequelize = require('sequelize');
const sequelize = new Sequelize('doclocator', 'root', '', {
  dialect: 'mysql',
  host: 'localhost',
});

const Patient = sequelize.define('Patient', {
  PatientId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  Phone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  DOB: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  Longitude: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  Latitude: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  Gender: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = {
  Patient,
  sequelize,
};
