const path = require('path');
const multer = require('multer');
const fs = require('fs');

const uploadDir = path.join(__dirname, '..', 'images');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, unique + ext);
  }
});

const fileFilter = (_req, file, cb) => {
  if (/image\/(png|jpe?g|gif|webp)/.test(file.mimetype)) cb(null, true);
  else cb(new Error('Tipo de archivo no permitido'), false);
};

module.exports = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });
