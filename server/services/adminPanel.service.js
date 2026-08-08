const Employee = require('../models/employee.model')
const Vehicle = require('../models/vehicle.model')

module.exports.listEmployees = async () => {
  return Employee.find().lean()
}

module.exports.createEmployee = async (payload) => {
  return Employee.create(payload)
}

module.exports.updateEmployee = async (id, payload) => {
  return Employee.findByIdAndUpdate(id, payload, { new: true })
}

module.exports.deleteEmployee = async (id) => {
  return Employee.findByIdAndDelete(id)
}

module.exports.listVehicles = async () => {
  return Vehicle.find().lean()
}

module.exports.createVehicle = async (payload) => {
  return Vehicle.create(payload)
}

module.exports.updateVehicle = async (id, payload) => {
  return Vehicle.findByIdAndUpdate(id, payload, { new: true })
}

module.exports.deleteVehicle = async (id) => {
  return Vehicle.findByIdAndDelete(id)
}

let settings = {
  companyName: 'My Company',
  address: 'Gandhinagar',
  industry: 'Software',
  adminContact: 'admin@example.com',
  fuelCost: '90',
  travelCost: '2.5'
}

module.exports.getSettings = async () => settings

module.exports.saveSettings = async (payload) => {
  settings = { ...settings, ...payload }
  return settings
}
