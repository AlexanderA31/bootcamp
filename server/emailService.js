// server/utils/emailService.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT || 587),
  secure: false, // TLS STARTTLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Envía y lanza error si falla
const send = (opts) =>
  transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    ...opts
  });

// Envía y NO rompe la app si falla (loggea warning)
const safeSend = async (opts) => {
  try {
    const info = await send(opts);
    return info;
  } catch (e) {
    console.warn('Email error:', e.message);
    return null;
  }
};

module.exports = { send, safeSend };
