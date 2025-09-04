// server/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

// Routers
const petRouter = require('./Routes/PetRoute');
const userRouter = require('./Routes/UserRoute');
const adoptionRouter = require('./Routes/AdoptionRoute');
const testEmailRouter = require('./Routes/TestEmailRoute');

const app = express(); // 👈 Primero creamos la app

// =======================
// 🌐 Configuración de CORS
// =======================
const allowed = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

app.use(cors({
  origin: allowed.length ? allowed : true, // Si no hay CORS_ORIGINS, permite todo (dev)
  credentials: true
}));

// Middleware básico
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Carpeta estática para imágenes
app.use('/images', express.static(path.join(__dirname, 'images')));

// =======================
// Rutas principales
// =======================
app.use('/api', petRouter);
app.use('/api', userRouter);
app.use('/api', adoptionRouter);
app.use('/api', testEmailRouter);

// Ruta de prueba
app.get('/api/ping', (_req, res) => res.json({ message: 'pong' }));

// =======================
// Conexión a la base de datos
// =======================
const mongoUri = process.env.MONGODB_URI || process.env.mongooseURL;
if (!mongoUri) {
  console.error('❌ No se encontró MONGODB_URI ni mongooseURL en .env');
  process.exit(1);
}

mongoose.connect(mongoUri)
  .then(() => {
    console.log('Connected to DB');
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB Error:', err));
