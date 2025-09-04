// server/Routes/TestEmailRoute.js
const express = require('express');
const router = express.Router();
const emailService = require('../utils/emailService');

// POST /api/test-email
// body JSON: { "to": "destinatario@correo.com", "subject": "Hola", "text": "Mensaje" }
router.post('/test-email', async (req, res) => {
  try {
    const { to, subject, text } = req.body;

    if (!to || !subject || !text) {
      return res.status(400).json({ message: 'Faltan campos: to, subject, text' });
    }

    const info = await emailService.send({ to, subject, text });
    return res.status(200).json({
      ok: true,
      messageId: info.messageId,
      accepted: info.accepted
    });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
});

module.exports = router;
