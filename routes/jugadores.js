const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init-jugadores");
const { Op } = require("sequelize");

router.get("/api/jugadores", async function (req, res) {
  let where = {};
  if (req.query.Nombre != undefined && req.query.Nombre !== "") {
    where.Nombre = {
      [Op.like]: "%" + req.query.Nombre + "%",
    };
  }
  let items = await db.Jugador.findAndCountAll({
    attributes: ["IdJugador", "Nombre", "Apellido", "FechaNacimiento", "Goles"],
    order: [["Nombre", "ASC"]],
    where,
  });

  res.json(items.rows);
});

router.get("/api/jugadores", async function (req, res, next) {
  let data = await db.Jugador.findAll({
    attributes: ["IdJugador", "Nombre", "Apellido", "FechaNacimiento", "Goles"],
  });
  res.json(data);
});

router.get("/api/jugadores/:id", async function (req, res, next) {
  try {
    const jugadoresId = req.params.id;
    const jugadorind = await db.Jugador.findByPk(jugadoresId);

    if (jugadorind) {
      res.json(jugadorind);
    } else {
      res.status(404).json({ mensaje: "Jugador no encontrada!" });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
});

router.post("/api/jugadores/", async (req, res) => {
  let { IdJugador, Nombre, Apellido, FechaNacimiento, Goles } = req.body;
  try {
    let newJugador = await db.Jugador.create({
      IdJugador: IdJugador,
      Nombre: Nombre,
      Apellido: Apellido,
      FechaNacimiento: FechaNacimiento,
      Goles: Goles,
    });
    res.status(200).json(newJugador);
  } catch {
    res
      .status(500)
      .json({ mensaje: "No se ha podido agregar la jugador elegido" });
  }
});

router.put("/api/jugadores/:id", async (req, res, next) => {
  const IdJugador = req.params.id;
  console.log(IdJugador);
  const { Nombre, Apellido, FechaNacimiento, Goles } = req.body;
  try {
    const jugador = await db.Jugador.findByPk(IdJugador);
    if (!jugador) {
      return res.status(404).json({ mensaje: "Jugador no encontrad" });
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

router.delete("/api/jugadores/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const jugador = await db.Jugador.findByPk(id);
    if (jugador) {
      await jugador.destroy();
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
