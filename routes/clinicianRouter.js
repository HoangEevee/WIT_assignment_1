// add router
const passport = require('passport')
const express = require('express')
const clinicianRouter = express.Router()
const isAuthenticated = require("../utils/helper").isAuthenticated
// connect to controller
const clinicianController = require('../controllers/clinicianController.js')

// localhost:8080/clinician*** where *** is the following
clinicianRouter.get('/', clinicianController.logInPage)

clinicianRouter.post('/login',
passport.authenticate('local', {
    successRedirect: '/clinician/dashboard', failureRedirect: '/clinician', failureFlash: true
})
)

clinicianRouter.get("/dashboard", isAuthenticated, clinicianController.getAllPatientData)

clinicianRouter.get('/create-patient-account', clinicianController.createPatientPage)
//clinicianRouter.post('/create-patient', clinicianController.createPatient)

// yet to be implemented
// NOTE: add whatever method after the controller + add any post routes
// These routes only follow what Quynh suggested
//clinicianRouter.get('/all-comments', clinicianController)
// if "new OR exisitng" implemented into route '/'
//clinicianRouter.get('/current-user-login', clinicianController)
clinicianRouter.get('/create-new-account', clinicianController.createAccountPage)
clinicianRouter.post('/create-clinician', clinicianController.createClinician)
clinicianRouter.get('/view-patient-comments', clinicianController.getPatientcomments)
clinicianRouter.post('/send-support-messages', clinicianController.getSendsupportmessages)

// onwards to other routers!
clinicianRouter.use('/:id', isAuthenticated, require('./managePatientRouter'))

module.exports = clinicianRouter
