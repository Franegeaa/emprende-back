const express = require("express");
const router = express.Router();
const { Op, ValidationError } = require("sequelize");
const db = require("../base-orm/sequelize-init-jugadores");


router.get("/api/jugadores", async function (req, res) {
  let where = {};
  if (req.query.Nombre != undefined && req.query.Nombre !== "") {
    where.Nombre = {
      [Op.like]: "%" + req.query.Nombre + "%",
    };
  }

  let jugadores = await db.Jugador.findAll({
    attributes: ["IdJugador", "Nombre", "Apellido", "FechaNacimiento", "Goles"],
    where,
  });
  res.json(jugadores);
});

router.get("/api/jugadores/:id", async function (req, res, next) {
  try {
    const jugadorId = req.params.id;
    const jugador = await db.Jugador.findByPk(jugadorId);

    if (jugador) {
      res.json(jugador);
    } else {
      res.status(404).json({ mensaje: "No encontrado!" });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
});

router.post("/api/jugadores", async (req, res) => {
  try {
    const { Nombre, Apellido, FechaNacimiento, Goles } = req.body;
    let jugador = await db.Jugador.create({
      Nombre: Nombre,
      Apellido: Apellido,
      FechaNacimiento: FechaNacimiento,
      Goles: Goles,
    });
    res.json(jugador);
  } catch (error) {
    res.status(500).json({ mensaje: "No se ha podido crear el jugador" });
  }
});

router.put("/api/jugadores/:id", async (req, res, next) => {
  const jugadorId = req.params.id;
  console.log(jugadorId);
  const { Nombre, Apellido, FechaNacimiento, Goles } = req.body;
  try {
    const jugador = await db.Jugador.findByPk(jugadorId);
    if (!jugador) {
      return res.status(404).json({ mensaje: "jugador no encontrado" });
    }

    jugador.Nombre = Nombre;
    jugador.Apellido = Apellido;
    jugador.FechaNacimiento = FechaNacimiento;
    jugador.Goles = Goles;
    await jugador.save();

    res.json({ mensaje: "Jugador actualizado exitosamente" });
  } catch (error) {
    console.error("Error al actualizar el jugador:", error);
    res.status(500).json({ mensaje: "Error al actualizar el jugador" });
  }
});

module.exports = router;

router.delete("/api/jugadores/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const jugadorId = await db.Jugador.findByPk(id);
    if (jugadorId) {
      await jugadorId.destroy();
      res.json("El jugador ha sido eliminado");
    } else {
      res
        .status(404)
        .json({ mensaje: "No se puede eliminar el jugador, no existe!" });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
});

module.exports = router;
