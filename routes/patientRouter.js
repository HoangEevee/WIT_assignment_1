// add router
const express = require('express')
const patientRouter = express.Router()

// connect to controller
const patientController = require('../controllers/patientController.js')

// localhost:8080/patient*** where *** is the following
patientRouter.get('/', patientController.logInPage)
patientRouter.post('/', patientController.logIn)

patientRouter.get('/home', patientController.homePage)
patientRouter.get('/user', patientController.getDataByPatient)
patientRouter.get('/record-health-form', patientController.getRecordDataForm)
patientRouter.post('/record-glucose', patientController.insertGlucose)

module.exports = patientRouter


