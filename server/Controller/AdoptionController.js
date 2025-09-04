// server/Controller/AdoptionController.js
const Adoption = require('../Model/Adoption');
const emailService = require('../utils/emailService');

// POST /api/adoptions
const createAdoption = async (req, res) => {
  try {
    const { petId, applicantName, applicantEmail, message } = req.body;
    const adoption = await Adoption.create({ petId, applicantName, applicantEmail, message });

    // notificación opcional al solicitante
    await emailService.safeSend({
      to: applicantEmail,
      subject: 'Solicitud de adopción recibida',
      text: `Hola ${applicantName}, hemos recibido tu solicitud. ¡Gracias!`
    });

    res.status(201).json(adoption);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/adoptions  (admin)
const listAdoptions = async (_req, res) => {
  try {
    const rows = await Adoption.find().sort({ createdAt: -1 });
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /api/adoptions/:id  (admin)
const updateAdoption = async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ['Pending', 'Approved', 'Rejected'];
    if (status && !allowed.includes(status)) {
      return res.status(400).json({ message: 'Estado inválido' });
    }

    const adoption = await Adoption.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!adoption) return res.status(404).json({ message: 'Solicitud no encontrada' });

    // notificación opcional según decisión
    await emailService.safeSend({
      to: adoption.applicantEmail,
      subject: `Tu solicitud de adopción fue ${status}`,
      text: `Tu solicitud ahora está en estado: ${status}.`
    });

    res.json(adoption);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createAdoption, listAdoptions, updateAdoption };
