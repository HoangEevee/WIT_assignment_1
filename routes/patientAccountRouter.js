// add router
const express = require('express')
const patientAccountRouter = express.Router()

// connect to controller
const patientAccountController = require('../controllers/patientAccountController.js')

patientAccountRouter.get('/', patientAccountController.getPersonal)
patientAccountRouter.get('/past-health', patientAccountController.getPastHealth)
patientAccountRouter.get('/account-info', patientAccountController.getDataByPatient)
patientAccountRouter.get('/record-health-form', patientAccountController.getRecordDataForm)
patientAccountRouter.post('/insert-health-data', patientAccountController.insertHealthData)

module.exports = patientAccountRouter