const express = require("express");

require("./base-orm/sqlite-init-peliculas");  // crear base si no existe
require("./base-orm/sqlite-init-jugadores");  // crear base si no existe
const app = express();
app.use(express.json()); // para poder leer json en el body

const peliculasRouter = require("./routes/peliculas");
app.use(peliculasRouter);

const jugadoresmockRouter = require("./routes/jugadoresmock");
app.use(jugadoresmockRouter);

const jugadoresRouter = require("./routes/jugadores");
app.use(jugadoresRouter);


const autos = require("./routes/autos");
app.use(autos);


app.get("/", (req,res)=>{
    res.send("Backend inicial tpi-backend!");

});

const port = 3000;
app.listen(port, () => {
  console.log(`sitio escuchando en el puerto ${port}`);
});
