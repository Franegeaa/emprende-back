const express = require('express');

const app = express();
app.use(express.json());

const autos = require("./routes/autos");
app.use(autos);

app.get("/", (req,res)=>{
    res.send("Backend inicial tpi-backend!");
});

const port = 3000;
app.listen(port, ()=>{
    console.log(`sitio escuchando en el puerto ${port}`);
});