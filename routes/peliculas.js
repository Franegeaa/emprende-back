const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init-peliculas");

router.get("/api/peliculas", async function (req, res, next) {
  let data = await db.peliculas.findAll({
    attributes: ["idPelicula", "Titulo", "Productor","FechaLanzamiento"],
  });
  res.json(data);
});


router.get("/api/peliculas/:id", async function (req, res, next) {
    try {
      const peliculasId = req.params.id;
      const peliculaind = await db.peliculas.findByPk(peliculasId);
      
      if (peliculaind) {
        res.json(peliculaind);
      } else {
        res.status(404).json({ mensaje: "Pelicula no encontrada!" });
      }
    } catch (error) {
      res.status(500).json({ mensaje: "Error interno del servidor" });
    }
  });

router.post('/api/peliculas/', async (req, res) => {
    let {
        idPelicula,
        Titulo,
        Productor,
        FechaLanzamiento,
    } = req.body;
    try {
        let newPelicula = await db.peliculas.create({
            idPelicula: idPelicula,
            Titulo: Titulo,
            Productor: Productor,
            FechaLanzamiento: FechaLanzamiento
        });
        res.status(200).json(newPelicula);
    } catch {
        res.status(500).json({ mensaje: "No se ha podido agregar la pelicula elegida" });
    }
});
  
  
router.put('/api/peliculas/:id', async (req, res, next) => {
    const idPelicula = req.params.id;
    console.log(idPelicula)
    const { Titulo, Productor, FechaLanzamiento } = req.body;
    try {
      const pelicula = await db.peliculas.findByPk(idPelicula);
      if (!pelicula) {
        return res.status(404).json({ mensaje: 'Pelicula no encontrada' });
      }
  
      pelicula.Titulo = Titulo;
      pelicula.Productor = Productor; 
      pelicula.FechaLanzamiento = FechaLanzamiento;
      await pelicula.save();
  
      res.json({ mensaje: 'Pelicula actualizado exitosamente' });
    } catch (error) {
      console.error('Error al actualizar la pelicula:', error);
      res.status(500).json({ mensaje: 'Error al actualizar la pelicula' });
    }
  });
  
  module.exports = router;
  
router.delete('/api/peliculas/:id', async (req, res) => {
    try {
        const {id} = req.params;
        console.log(id)
        const pelicula = await db.peliculas.findByPk(id);
        if (pelicula) {
            await pelicula.destroy();
            res.json("La pelicula ha sido eliminada")
        } else {
            res.status(404).json({ mensaje: "No se puede eliminar la pelicula, no existe!" });
        }
    } catch (error){
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
});


module.exports = router;
