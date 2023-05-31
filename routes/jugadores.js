const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init-jugadores");

router.get("/api/jugadores", async function (req, res, next) {
  let data = await db.jugadores.findAll({
    attributes: ["idJugador", "Nombre", "FechaNac"],
  });
  res.json(data);
});

router.get("/api/jugadores/:id", async function (req, res, next) {
  try {
    const jugadoresid = req.params.id;
    const jugadorid = await db.peliculas.findByPk(jugadoresid);

    if (jugadorid) {
      res.json(jugadorid);
    } else {
      res.status(404).json({ mensaje: "Jugador no encontrado!" });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
});

router.post("/api/jugador/", async (req, res) => {
  let { idJugador, Nombre, FechaNac } = req.body;
  try {
    let newJugador = await db.jugadores.create({
      idJugador: idJugador,
      Nombre: Nombre,
      FechaNac: FechaNac,
    });
    res.status(200).json(newJugador);
  } catch {
    res.status(500).json({ mensaje: "No se ha podido agregar el jugador" });
  }
});

router.put("/api/jugadores/:id", async (req, res, next) => {
  const idJugador = req.params.id;
  console.log(idJugador);
  const { Nombre, FechaNac } = req.body;
  try {
    const jugador = await db.jugadores.findByPk(idJugador);
    if (!jugador) {
      return res.status(404).json({ mensaje: "Jugador no encontrado" });
    }

    pelicula.Nombre = Nombre;
    pelicula.FechaNac = FechaNac;
    await jugador.save();

    res.json({ mensaje: "Jugador actualizado exitosamente" });
  } catch (error) {
    console.error("Error al actualizar el Jugador:", error);
    res.status(500).json({ mensaje: "Error al actualizar el jugador" });
  }
});

module.exports = router;

router.delete("/api/jugadores/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const jugador = await db.jugadores.findByPk(id);
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
