const express = require("express");

const app = express();
app.use(express.json()); // para poder leer json en el body

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend inicial tpi-backend!");
});

const port = 3000;
app.listen(port, () => {
  console.log(`sitio escuchando en el puerto ${port}`);
});
