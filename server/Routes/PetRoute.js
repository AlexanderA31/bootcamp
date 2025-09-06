const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const { postPetRequest, approveRequest, deletePost, allPets } = require('../Controller/PetController');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'pets',
    format: async (req, file) => 'png', // supports promises as well
    public_id: (req, file) => Date.now() + '-' + Math.round(Math.random() * 1E9),
  },
});

const upload = multer({ storage: storage });

router.get('/requests', (req, res) => allPets('Pending', req, res));
router.get('/approvedPets', (req, res) => allPets('Approved', req, res));
router.get('/adoptedPets', (req, res) => allPets('Adopted', req, res));
router.post('/servicios', upload.single('picture'), postPetRequest);
router.put('/approving/:id', approveRequest);
router.delete('/delete/:id', deletePost);

module.exports = router;
