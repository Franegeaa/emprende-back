const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite:" + "./.data/peliculas.db");

const peliculas = sequelize.define(
  "peliculas",
  {
    idPelicula: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Titulo: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El título es requerido",
        },
        len: {
          args: [1, 255],
          msg: "El título debe tener entre 1 y 255 caracteres",
        },
      },
    },
    Productor: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El Productor es requerido",
        },
        len: {
          args: [1, 255],
          msg: "El Productor debe tener entre 1 y 255 caracteres",
        },
      },
    },
    FechaLanzamiento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "La fecha de lanzamiento es requerida",
        },
        isDate: {
          args: true,
          msg: "La fecha de lanzamiento debe tener un formato válido",
        },
      },
    }, 
  },
  {
    hooks: {
      beforeValidate: function (peliculas, options) {
        if (typeof peliculas.Titulo === "string") {
          peliculas.Titulo = peliculas.Titulo.trim();
        }
        if (typeof peliculas.Productor === "string") {
          peliculas.Productor = peliculas.Productor.trim();
        }
      },
    },
    timestamps: false,
  }
);

module.exports = {
  sequelize,
  peliculas,
};
