// server/Routes/AdoptionRoute.js
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { createAdoption, listAdoptions, updateAdoption } = require('../Controller/AdoptionController');
const { createAdoptionRules, handleValidation, param } = require('../middleware/validation');

// Crear solicitud (público)
router.post('/adoptions', createAdoptionRules, handleValidation, createAdoption);

// Listar (solo admin)
router.get('/adoptions', protect, authorize('admin'), listAdoptions);

// Actualizar estado (solo admin)
router.patch('/adoptions/:id',
  protect, authorize('admin'),
  param('id').isMongoId(), handleValidation,
  updateAdoption
);

module.exports = router;
