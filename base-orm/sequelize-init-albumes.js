const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite:" + "./.data/albumesdb.db");
//Sequalize para manejar la bd

const Album = sequelize.define(
  "Album",
  {
    IdAlbum: {
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
    Artista: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El artista es requerido",
        },
        len: {
          args: [1, 255],
          msg: "El artista debe tener entre 1 y 255 caracteres",
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
      beforeValidate: function (album, options) {
        if (typeof album.Titulo === "string") {
          album.Titulo = album.Titulo.trim();
        }
        if (typeof album.Artista === "string") {
          album.Artista = album.Artista.trim();
        }
      },
    },
    timestamps: false,
  }
);

module.exports = {
  sequelize,
  Album,
};
