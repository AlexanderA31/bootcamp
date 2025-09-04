const express = require('express');
const router = express.Router();
const upload = require('../utils/upload'); // 👈 Importa la config de multer
const {
  postPetRequest,
  approveRequest,
  getPets,
  deletePost
} = require('../Controller/PetController');

// POST /pets → crear mascota con imagen
router.post('/pets', upload.single('image'), postPetRequest);

// GET /pets → listar mascotas (todas o por ?status=Pending)
router.get('/pets', getPets);

// PATCH /pets/:id → actualizar estado de mascota
router.patch('/pets/:id', approveRequest);

// DELETE /pets/:id → eliminar mascota
router.delete('/pets/:id', deletePost);

module.exports = router;

