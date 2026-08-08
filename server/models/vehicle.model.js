const mongoose = require('mongoose')

const vehicleSchema = new mongoose.Schema({
  registrationNumber: { type: String, required: true, unique: true },
  model: { type: String },
  seatingCapacity: { type: Number },
  assignedDriver: { type: String },
  status: { type: String, enum: ['Active', 'Deactivated'], default: 'Active' }
}, { timestamps: true })

const Vehicle = mongoose.model('Vehicle', vehicleSchema)

module.exports = Vehicle
