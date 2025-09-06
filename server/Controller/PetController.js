const Pet = require('../Model/PetModel');
const cloudinary = require('../config/cloudinary');

const postPetRequest = async (req, res) => {
  try {
    const { name, age, area, justification, email, phone, type } = req.body;
    const { path, filename } = req.file;

    const pet = await Pet.create({
      name,
      age,
      area,
      justification,
      email,
      phone,
      type,
      imageUrl: path,
      public_id: filename,
      status: 'Pending'
    });

    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const approveRequest = async (req, res) => {
  try {
    const id = req.params.id;
    const { email, phone, status } = req.body;
    const pet = await Pet.findByIdAndUpdate(id, { email, phone, status }, { new: true });

    if (!pet) {
      return res.status(404).json({ error: 'Mascota no encontrada' });
    }

    res.status(200).json(pet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const allPets = async (reqStatus, req, res) => {
  try {
    const data = await Pet.find({ status: reqStatus }).sort({ updatedAt: -1 });
    if (data.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ error: 'No se encontraron datos' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const pet = await Pet.findByIdAndDelete(id);
    if (!pet) {
      return res.status(404).json({ error: 'Mascota no encontrada' });
    }
    
    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(pet.public_id);

    res.status(200).json({ message: 'Mascota eliminada exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  postPetRequest,
  approveRequest,
  deletePost,
  allPets
};
