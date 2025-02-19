const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('art_connect', 'root', 'system', {
  host: 'localhost',
  dialect: 'mysql',
});

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  creativeDomain: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  workSamples: {
    type: DataTypes.JSONB,  // Store links to work samples as an array
    allowNull: true,
  },
  professionalExperience: {
    type: DataTypes.TEXT,  // Store professional experience text
    allowNull: true,
  },
  skills: {
    type: DataTypes.JSONB,  // Store skills as an array of strings
    allowNull: true,
  },
});

module.exports = { User, sequelize };
