const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('sqlite:' +'./.data/autos.db');
const Auto = sequelize.define('Auto', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  marca: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  modelo: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  puertas: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  }
}, {
  timestamps: false
});


module.exports = {sequelize, Auto};
