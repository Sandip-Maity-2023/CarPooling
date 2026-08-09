const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  ride: { type: mongoose.Schema.Types.ObjectId, ref: 'Ride', required: true },
  passenger: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'Accepted', 'Rejected', 'Cancelled'], 
    default: 'Pending' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);