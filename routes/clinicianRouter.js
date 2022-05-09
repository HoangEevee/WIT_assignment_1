// add router
const express = require('express')
const clinicianRouter = express.Router()

// connect to controller
const clinicianController = require('../controllers/clinicianController.js')

// localhost:8080/clinician*** where *** is the following
clinicianRouter.get('/', clinicianController.logInPage)
clinicianRouter.post('/login', clinicianController.logIn) //only get dashboard of clinician Chris

clinicianRouter.get("/dashboard", clinicianController.getAllPatientData)

clinicianRouter.get('/create-patient-account', clinicianController.createPatientPage)
clinicianRouter.post('/create-patient', clinicianController.createPatient)

// yet to be implemented
// NOTE: add whatever method after the controller + add any post routes
// These routes only follow what Quynh suggested
//clinicianRouter.get('/all-comments', clinicianController)
// if "new OR exisitng" implemented into route '/'
//clinicianRouter.get('/current-user-login', clinicianController)
clinicianRouter.get('/create-new-account', clinicianController.createAccountPage)
clinicianRouter.post('/create-clinician', clinicianController.createClinician)

// onwards to other routers!
clinicianRouter.use('/:id', require('./managePatientRouter'))

module.exports = clinicianRouter
