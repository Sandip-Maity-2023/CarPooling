const express = require('express')
const router = express.Router()
const controller = require('../controllers/adminPanel.controller')

// Employees
router.get('/employees', controller.getEmployees)
router.post('/employees', controller.createEmployee)
router.put('/employees/:id', controller.updateEmployee)
router.delete('/employees/:id', controller.deleteEmployee)

// Vehicles
router.get('/vehicles', controller.getVehicles)
router.post('/vehicles', controller.createVehicle)
router.put('/vehicles/:id', controller.updateVehicle)
router.delete('/vehicles/:id', controller.deleteVehicle)

// Settings
router.get('/settings', controller.getSettings)
router.post('/settings', controller.saveSettings)

module.exports = router
