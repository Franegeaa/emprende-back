const express = require("express");
const router = express.Router();
const Auto = require("../modelos/auto.js");

// Obtener todos los autos
router.get('/api/autos', async function(req, res, next)  {
    try {
      const autos = await Auto.findAll();
      res.json(autos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los autos' });
    }
  });
  
  // Obtener un auto por ID
  router.get('/api/autos/:id', async function(req, res, next)  {
    const { id } = req.params;
    try {
      const auto = await Auto.findByPk(id);
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
    const { nombre, marca, modelo, fecha, puertas } = req.body;
    try {
      const auto = await Auto.create({ nombre, marca, modelo, fecha, puertas });
      res.json(auto);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el auto' });
    }
  });
  
  // Actualizar un auto por ID
  router.put('/api/autos/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, marca, modelo, fecha, puertas } = req.body;
    try {
      const auto = await Auto.findByPk(id);
      if (auto) {
        auto.nombre = nombre;
        auto.marca = marca;
        auto.modelo = modelo;
        auto.fecha = fecha;
        auto.puertas = puertas;
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
      const auto = await Auto.findByPk(id);
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