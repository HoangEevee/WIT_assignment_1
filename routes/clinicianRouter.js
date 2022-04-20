// add router
const express = require('express')
const clinicianRouter = express.Router()

// connect to controller
const clinicianController = require('../controllers/clinicianController.js')

// nothing here yet
clinicianRouter.get('/', clinicianController.getAllClinicianData)
//peopleRouter.post('/', patientController.writeGlucose)

module.exports = clinicianRouter
