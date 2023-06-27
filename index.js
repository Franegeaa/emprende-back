const express = require("express");
const cors = require("cors");
const app = express();

require("./base-orm/sqlite-init"); // crear base si no existe
app.use(express.json()); // para poder leer json en el body
app.use(cors());

const peliculasRouter = require("./routes/peliculas");
app.use(peliculasRouter);

const jugadoresRouter = require("./routes/jugadores");
app.use(jugadoresRouter);

const autos = require("./routes/autos");
app.use(autos);

app.get("/", (req, res) => {
  res.send("Backend inicial tpi-backend!");
});

const albumesRouter = require("./routes/albumes");
app.use(albumesRouter);

// levantar servidor
if (!module.parent) {
  // si no es llamado por otro modulo, es decir, si es el modulo principal -> levantamos el servidor
  const port = process.env.PORT || 4000; // en produccion se usa el puerto de la variable de entorno PORT
  app.locals.fechaInicio = new Date();
  app.listen(port, () => {
    console.log(`sitio escuchando en el puerto ${port}`);
  });
}
module.exports = app; // para testing
