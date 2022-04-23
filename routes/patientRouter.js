// add router
const express = require('express')
const patientRouter = express.Router()

// connect to controller
const patientController = require('../controllers/patientController.js')

patientRouter.get('/', patientController.getAllPatientData)
patientRouter.get('/user', patientController.getDataByPatient)
patientRouter.get('/record_data_form', patientController.getRecordDataForm)
patientRouter.post('/record_glucose', patientController.insertGlucose)

module.exports = patientRouter


