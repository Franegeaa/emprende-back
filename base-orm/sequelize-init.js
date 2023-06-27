const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite:" + "./.data/tpi.db");

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
    DuracionMinutos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "La duración es requerida",
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
      Goles: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Los goles son requeridos",
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
            jugador.Apellido = jugador.Apellido.trim();
          }
        },
      },
      timestamps: false,
    }
  );

  const Auto = sequelize.define('Auto', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
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
    marca: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "La marca es requerido",
        },
        len: {
          args: [1, 255],
          msg: "La marca debe tener entre 1 y 255 caracteres",
        },
      }
    },
    modelo: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El modelo es requerido",
        },
        len: {
          args: [1, 255],
          msg: "El modelo debe tener entre 1 y 255 caracteres",
        },
      }
    },
    puertas: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "La cantidad de puertas es requerido",
        }
      }
    },
    fecha: {
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
    }
  },     {
    hooks: {
      beforeValidate: function (auto, options) {
        if (typeof auto.nombre === "string") {
          auto.nombre = auto.nombre.trim();
        }
        if (typeof auto.modelo === "string") {
          auto.modelo = auto.modelo.trim();
        }
        if (typeof auto.marca === "string") {
            auto.marca = auto.marca.trim();
          }
      },
    },
    timestamps: false,
  });

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
      idgenero: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Precio es requerido",
          }
        }
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
  peliculas,
  Jugador,
  Auto,
  Album,
};
