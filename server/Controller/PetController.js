// Controller/PetController.js
const Pet = require('../Model/Pet');
const fs = require('fs');
const path = require('path');

// Crear mascota (con imagen opcional)
const postPetRequest = async (req, res) => {
  try {
    const { name, age, area, justification, email, phone, type } = req.body;
    const filename = req.file?.filename || null;

    const pet = await Pet.create({
      name,
      age,
      area,
      justification,
      email,
      phone,
      type,
      filename,
      status: 'Pending'
    });

    res.status(201).json(pet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Aprobar/rechazar mascota
const approveRequest = async (req, res) => {
  try {
    const id = req.params.id;
    const { email, phone, status } = req.body;

    const allowed = ['Pending', 'Approved', 'Rejected'];
    if (status && !allowed.includes(status)) {
      return res.status(400).json({ error: 'Estado inválido' });
    }

    const pet = await Pet.findByIdAndUpdate(
      id,
      { email, phone, status },
      { new: true, runValidators: true }
    );

    if (!pet) return res.status(404).json({ error: 'Mascota no encontrada' });

    res.status(200).json(pet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar mascotas (todas o por estado)
const getPets = async (req, res) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};
    const data = await Pet.find(query).sort({ updatedAt: -1 });

    if (!data.length) return res.status(404).json({ error: 'No se encontraron datos' });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar mascota
const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const pet = await Pet.findByIdAndDelete(id);
    if (!pet) return res.status(404).json({ error: 'Mascota no encontrada' });

    if (pet.filename) {
      const filePath = path.join(__dirname, '../images', pet.filename);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    res.status(200).json({ message: 'Mascota eliminada exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  postPetRequest,
  approveRequest,
  getPets,
  deletePost
};


