// add router
const express = require('express')
const patientRouter = express.Router()

// connect to controller
const patientController = require('../controllers/patientController.js')

// express-validator, to validate user data in forms
const expressValidator = require('express-validator')


patientRouter.get('/', patientController.getPatientData)
patientRouter.get('/:patient_id', patientController.getDataByPatient)
//peopleRouter.post('/', patientController.writeGlucose)

module.exports = patientRouter


