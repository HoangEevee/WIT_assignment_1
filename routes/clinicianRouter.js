// add router
const express = require('express')
const clinicianRouter = express.Router()

// connect to controller
const clinicianController = require('../controllers/clinicianController.js')

// localhost:8080/clinician*** where *** is the following
clinicianRouter.get('/', clinicianController.logInPage)

clinicianRouter.post('/', clinicianController.logIn)

clinicianRouter.get('/:id', clinicianController.getAllPatientData) //testing id out

//clinicianRouter.get('/dashboard', clinicianController.getAllPatientData)

clinicianRouter.get('/create-new-account', clinicianController.createAccountPage)
clinicianRouter.post('/create-clinician', clinicianController.createClinician)

clinicianRouter.get('/create-patient-account', clinicianController.createPatientPage)
clinicianRouter.post('/create-patient', clinicianController.createPatient)

clinicianRouter.get('/set-timeseries', clinicianController.setTimeseriesPage)
clinicianRouter.post('/new-timeseries', clinicianController.newTimeseries)

module.exports = clinicianRouter
