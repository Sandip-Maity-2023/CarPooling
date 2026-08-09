const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  model: { type: String, required: true },
  registrationNumber: { type: String, required: true, unique: true },
  seatingCapacity: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);