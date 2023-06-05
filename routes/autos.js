const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init-autos.js");

// Obtener todos los autos
router.get('/api/autos', async function(req, res, next)  {
    try {
      const autos = await db.Auto.findAll({
        attributes: ["id", "nombre", "marca", "modelo", "puertas", "fecha"],
      });
      res.json(autos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los autos' });
    }
  });
  
  // Obtener un auto por ID
  router.get('/api/autos/:id', async function(req, res, next)  {
    const { id } = req.params;
    try {
      const auto = await db.Auto.findByPk(id);
      if (auto) {
        res.json(auto);
      } else {
        res.status(404).json({ error: 'Auto no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el auto' });
    }
  });
  
  // Crear un nuevo auto
  router.post('/api/autos', async (req, res) => {
    const { nombre, marca, modelo, puertas, fecha } = req.body;
    try {
      const auto = await db.Auto.create({ nombre: nombre, marca: marca,modelo: modelo, puertas: puertas, fecha: fecha });
      res.json(auto);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el auto' });
    }
  });
  
  // Actualizar un auto por ID
  router.put('/api/autos/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, marca, modelo, puertas, fecha } = req.body;
    try {
      const auto = await db.Auto.findByPk(id);
      if (auto) {
        auto.nombre = nombre;
        auto.marca = marca;
        auto.modelo = modelo;
        auto.puertas = puertas;
        auto.fecha = fecha;
        await auto.save();
        res.json(auto);
      } else {
        res.status(404).json({ error: 'Auto no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el auto' });
    }
  });
  
  // Eliminar un auto por ID
  router.delete('/api/autos/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const auto = await db.Auto.findByPk(id);
      if (auto) {
        await auto.destroy();
        res.json({ message: 'Auto eliminado correctamente' });
      } else {
        res.status(404).json({ error: 'Auto no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el auto' });
    }
  });
  
module.exports = router;