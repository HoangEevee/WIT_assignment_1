// add router
const express = require('express')
const clinicianRouter = express.Router()

// connect to controller
const clinicianController = require('../controllers/clinicianController.js')

// nothing here yet
clinicianRouter.get('/', clinicianController.getAllClinicianData)

clinicianRouter.get('/create-new-account', clinicianController.createAccountPage)
clinicianRouter.post('/create-clinician', clinicianController.createClinician)

clinicianRouter.get('/create-patient-account', clinicianController.createPatientPage)
clinicianRouter.post('/create-patient', clinicianController.createPatient)

clinicianRouter.get('/set-timeseries', clinicianController.setTimeseriesPage)
clinicianRouter.post('/new-timeseries', clinicianController.newTimeseries)

module.exports = clinicianRouter
