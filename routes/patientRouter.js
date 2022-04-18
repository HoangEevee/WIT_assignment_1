const express = require('express')
const patientRouter = express.Router()
const patientController = require('../controllers/patientController')

patientRouter.get('/', patientController.getPatientData)
patientRouter.get('/:patient_id', patientController.getDataByPatient)

module.exports = patientRouter