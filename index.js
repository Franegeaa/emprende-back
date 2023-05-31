const express = require("express");

// crear servidor
const app = express();
require("./base-orm/sqlite-init-albumes");  // crear base si no existe
app.use(express.json()); // para poder leer json en el body

// controlar ruta
app.get("/", (req, res) => {
  res.send("Primera entrega TP DDS!!! Grupo: 13");
});

const albumesRouter = require("./routes/albumes");
app.use(albumesRouter);

// levantar servidor
if (!module.parent) {   // si no es llamado por otro modulo, es decir, si es el modulo principal -> levantamos el servidor
  const port = process.env.PORT || 3000;   // en produccion se usa el puerto de la variable de entorno PORT
  app.locals.fechaInicio = new Date();
  app.listen(port, () => {
    console.log(`sitio escuchando en el puerto ${port}`);
  });
}
// Correr app
module.exports = app; // para testing

