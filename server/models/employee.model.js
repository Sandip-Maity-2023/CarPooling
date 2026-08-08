const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
  fullname: {
    firstname: { type: String, required: true },
    lastname: { type: String }
  },
  department: { type: String },
  manager: { type: String },
  location: { type: String },
  access: { type: String, enum: ['Active', 'Deactivated'], default: 'Active' }
}, { timestamps: true })

const Employee = mongoose.model('Employee', employeeSchema)

module.exports = Employee
