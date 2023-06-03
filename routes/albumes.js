const express = require("express");
const router = express.Router();
//Administrar albumes
const db = require("../base-orm/sequelize-init-albumes");

router.get("/api/albumes", async function (req, res, next) {
  let data = await db.Album.findAll({
    attributes: ["IdAlbum", "Titulo", "Artista","FechaLanzamiento", "idgenero"],
  });
  res.json(data);
});


router.get("/api/albumes/:id", async function (req, res, next) {
    try {
      const albumId = req.params.id;
      const album = await db.Album.findByPk(albumId);
      
      if (album) {
        res.json(album);
      } else {
        res.status(404).json({ mensaje: "No encontrado!" });
      }
    } catch (error) {
      res.status(500).json({ mensaje: "Error interno del servidor" });
    }
  });


router.post("/api/albumes", async function (req, res, next) {
  try {
    const { Titulo, Artista, FechaLanzamiento, idgenero } = req.body;
    const album = await db.Album.create({
      Titulo,
      Artista,
      FechaLanzamiento,
      idgenero,
    });
    res.json(album);
  } catch (error) {
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
});
  
  
router.put('/api/albumes/:id', async (req, res, next) => {
    const albumId = req.params.id;
    console.log(albumId)
    const { Titulo, Artista, FechaLanzamiento, idgenero } = req.body;
    try {
      const album = await db.Album.findByPk(albumId);
      if (!album) {
        return res.status(404).json({ mensaje: 'Álbum no encontrado' });
      }
  
      album.Titulo = Titulo; // Actualiza el nombre del álbum con el nuevo valor
      album.Artista = Artista; // Actualiza el artista del álbum con el nuevo valor
      album.FechaLanzamiento = FechaLanzamiento; // Actualiza la fecha de lanzamiento del álbum con el nuevo valor
      album.idgenero = idgenero; // Actualiza el género del álbum con el nuevo valor
      await album.save();
  
      res.json({ mensaje: 'Álbum actualizado exitosamente' });
    } catch (error) {
      console.error('Error al actualizar el álbum:', error);
      res.status(500).json({ mensaje: 'Error al actualizar el álbum' });
    }
  });
  
  module.exports = router;

router.delete('/api/albumes/:id', async (req, res) => {
    try {
        const {id} = req.params;
        console.log(id)
        const albumind = await db.Album.findByPk(id);
        if (albumind) {
            await albumind.destroy();
            res.json("El disco ha sido eliminado")
        } else {
            res.status(404).json({ mensaje: "No se puede eliminar el disco, no existe!" });
        }
    } catch (error){
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
});


module.exports = router;
