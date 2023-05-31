const express = require("express");
const router = express.Router();

let arr_Jugadoresmock = [
  {
    nombre: "Jugador 1",
    id: 1,
    fechaNacimiento: "1990-01-01",
  },
  {
    nombre: "Jugador 2",
    id: 2,
    fechaNacimiento: "1995-05-10",
  },
  {
    nombre: "Jugador 3",
    id: 3,
    fechaNacimiento: "1988-12-15",
  },
  {
    nombre: "Jugador 4",
    id: 4,
    fechaNacimiento: "1992-07-20",
  },
  {
    nombre: "Jugador 5",
    id: 5,
    fechaNacimiento: "1998-03-08",
  },
  {
    nombre: "Jugador 6",
    id: 6,
    fechaNacimiento: "1991-11-25",
  },
  {
    nombre: "Jugador 7",
    id: 7,
    fechaNacimiento: "1997-09-12",
  },
  {
    nombre: "Jugador 8",
    id: 8,
    fechaNacimiento: "1993-04-05",
  },
  {
    nombre: "Jugador 9",
    id: 9,
    fechaNacimiento: "1989-02-18",
  },
  {
    nombre: "Jugador 10",
    id: 10,
    fechaNacimiento: "1994-06-30",
  },
];

router.get("/api/jugadoresMock", async function (req, res) {
  res.json(arr_Jugadoresmock);
});

router.get("/api/jugadoresMock/:id", async function (req, res) {
  let jugador = arr_Jugadoresmock.find((x) => x.id == req.params.id);
  if (jugador) res.json(jugador);
  else res.status(404).json({ message: "jugador no encontrado" });
});

router.post("/api/jugadoresMock/", (req, res) => {
  const { nombre } = req.body;
  let jugador = {
    nombre,
    id: Math.floor(Math.random() * 100000),
  };

  // aqui agregar a la coleccion
  arr_Jugadoresmock.push(jugador);

  res.status(201).json(jugador);
});

router.put("/api/jugadoresMock/:id", (req, res) => {
  let jugador = arr_Jugadoresmock.find((x) => x.id == req.params.id);

  if (jugador) {
    const { nombre } = req.body;
    jugador.nombre = nombre;
    res.json({ message: "jugador actualizado" });
  } else {
    res.status(404).json({ message: "jugador no encontrado" });
  }
});

router.delete("/api/jugadoresMock/:id", (req, res) => {
  let jugador = arr_Jugadoresmock.find((x) => x.id == req.params.id);

  if (jugador) {
    arr_Jugadoresmock = arr_Jugadoresmock.filter((x) => x.id != req.params.id);
    res.json({ message: "jugador eliminado" });
  } else {
    res.status(404).json({ message: "jugador no encontrado" });
  }
});

module.exports = router;
