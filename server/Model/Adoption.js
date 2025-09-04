// server/Model/Adoption.js
const mongoose = require('mongoose');

const AdoptionSchema = new mongoose.Schema({
  petId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  applicantName: { type: String, required: true },
  applicantEmail: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Adoption', AdoptionSchema);
