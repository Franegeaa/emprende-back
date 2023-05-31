const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite:" + "./.data/jugadores.db");

const jugadores = sequelize.define(
  "jugadores",
  {
    idJugador: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El Nombre es requerido",
        },
        len: {
          args: [1, 255],
          msg: "El Nombre debe tener entre 1 y 255 caracteres",
        },
      },
    },
    FechaNac: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "La fecha de nacimiento es requerida",
        },
        isDate: {
          args: true,
          msg: "La fecha de nacimiento debe tener un formato válido",
        },
      },
    },
  },
  {
    hooks: {
      beforeValidate: function (jugadores, options) {
        if (typeof jugadores.Nombre === "string") {
          jugadores.Nombre = jugadores.Nombre.trim();
        }
      },
    },
    timestamps: false,
  }
);

module.exports = {
  sequelize,
  jugadores,
};
