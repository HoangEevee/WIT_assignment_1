// add router
const express = require('express')
const patientRouter = express.Router()

// connect to controller
const patientController = require('../controllers/patientController.js')

// localhost:8080/patient*** where *** is the following
patientRouter.get('/', patientController.logInPage)
patientRouter.post('/login', patientController.logIn)

patientRouter.get('/home', patientController.getHomePage)
patientRouter.get('/aboutDiabetes', patientController.getAboutDiabetes)
patientRouter.get('/aboutWebsite', patientController.getAboutWebsite)
patientRouter.get('/yourAccount', patientController.getPersonal) // will change this to 'your account' later
patientRouter.get('/past-health', patientController.getPastHealth)
patientRouter.get('/user', patientController.getDataByPatient)
patientRouter.get('/record-health-form', patientController.getRecordDataForm)
patientRouter.post('/record-glucose', patientController.insertGlucose)
patientRouter.post('/record-weight', patientController.insertWeight)
patientRouter.post('/record-insulin', patientController.insertInsulin)
patientRouter.post('/record-exercise', patientController.insertExercise)

module.exports = patientRouter


