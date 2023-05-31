const express = require("express");

// crear servidor
const app = express();

// controlar ruta
app.get("/", (req, res) => {
  res.send("Backend inicial dds-backend!");
});

const jugadoresmockRouter = require("./routes/jugadoresmock");
app.use(jugadoresmockRouter);

// levantar servidor
const port = 3000;
app.listen(port, () => {
  console.log(`sitio escuchando en el puerto ${port}`);
});
