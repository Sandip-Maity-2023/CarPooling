const adminService = require('../services/adminPanel.service')

module.exports.getEmployees = async (req, res) => {
  const data = await adminService.listEmployees()
  res.json(data)
}

module.exports.createEmployee = async (req, res) => {
  const created = await adminService.createEmployee(req.body)
  res.status(201).json(created)
}

module.exports.updateEmployee = async (req, res) => {
  const updated = await adminService.updateEmployee(req.params.id, req.body)
  res.json(updated)
}

module.exports.deleteEmployee = async (req, res) => {
  await adminService.deleteEmployee(req.params.id)
  res.status(204).end()
}

module.exports.getVehicles = async (req, res) => {
  const data = await adminService.listVehicles()
  res.json(data)
}

module.exports.createVehicle = async (req, res) => {
  const created = await adminService.createVehicle(req.body)
  res.status(201).json(created)
}

module.exports.updateVehicle = async (req, res) => {
  const updated = await adminService.updateVehicle(req.params.id, req.body)
  res.json(updated)
}

module.exports.deleteVehicle = async (req, res) => {
  await adminService.deleteVehicle(req.params.id)
  res.status(204).end()
}

module.exports.getSettings = async (req, res) => {
  const data = await adminService.getSettings()
  res.json(data)
}

module.exports.saveSettings = async (req, res) => {
  const saved = await adminService.saveSettings(req.body)
  res.json(saved)
}
