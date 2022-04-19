// add router
const express = require('express')
const patientRouter = express.Router()

// connect to controller
const patientController = require('../controllers/patientController.js')

patientRouter.get('/', patientController.getAllPatientData)
patientRouter.get('/:patient_id', patientController.getDataByPatient)
//peopleRouter.post('/', patientController.writeGlucose)

module.exports = patientRouter


