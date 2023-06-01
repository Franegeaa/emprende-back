const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite:" + "./.data/jugadoresdb.db");
//Sequalize para manejar la bd

const Jugador = sequelize.define(
  "Jugador",
  {
    IdJugador: {
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
          msg: "El nombre es requerido",
        },
        len: {
          args: [1, 255],
          msg: "El nombre debe tener entre 1 y 255 caracteres",
        },
      },
    },
    Apellido: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El apellido es requerido",
        },
        len: {
          args: [1, 255],
          msg: "El apellido debe tener entre 1 y 255 caracteres",
        },
      },
    },
    FechaNacimiento: {
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
      beforeValidate: function (jugador, options) {
        if (typeof jugador.Nombre === "string") {
          jugador.Nombre = jugador.Nombre.trim();
        }
        if (typeof jugador.Apellido === "string") {
          jugador.Apellido = jugador.Artista.trim();
        }
      },
    },
    timestamps: false,
  }
);

module.exports = {
  sequelize,
  Jugador,
};
