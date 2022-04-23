// add router
const express = require('express')
const patientRouter = express.Router()

// connect to controller
const patientController = require('../controllers/patientController.js')

patientRouter.get('/', patientController.getDataByPatient)
patientRouter.get('/user', patientController.getDataByPatient)
patientRouter.get('/record-health-form', patientController.getRecordDataForm)
patientRouter.post('/record-glucose', patientController.insertGlucose)

module.exports = patientRouter


