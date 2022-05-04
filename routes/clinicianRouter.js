// add router
const express = require('express')
const clinicianRouter = express.Router()

// connect to controller
const clinicianController = require('../controllers/clinicianController.js')

// localhost:8080/clinician*** where *** is the following
clinicianRouter.get('/', clinicianController.logInPage)
clinicianRouter.post('/', clinicianController.logIn) //only get dashboard of clinician Chris

clinicianRouter.get("/dashboard", clinicianController.getAllPatientData)

//these stuffs below are not in use right now
clinicianRouter.get('/create-new-account', clinicianController.createAccountPage)
clinicianRouter.post('/create-clinician', clinicianController.createClinician)

clinicianRouter.get('/create-patient-account', clinicianController.createPatientPage)
clinicianRouter.post('/create-patient', clinicianController.createPatient)

// LEAVE THESE AT THE END
clinicianRouter.get('/:id', clinicianController.getOnePatientData)

clinicianRouter.get('/:id/set-timeseries', clinicianController.setTimeseriesPage)
clinicianRouter.post('/:id/new-timeseries', clinicianController.newTimeseries)
clinicianRouter.post('/:id/new-threshold', clinicianController.setThreshold)

module.exports = clinicianRouter
