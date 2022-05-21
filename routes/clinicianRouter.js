// add router
const express = require('express')
const clinicianRouter = express.Router()
// connect to controller
const clinicianController = require('../controllers/clinicianController.js')
const accountModController = require('../controllers/accountModController.js')

clinicianRouter.get("/dashboard", clinicianController.getAllPatientData)

clinicianRouter.get('/create-patient-account', clinicianController.createPatientPage)
clinicianRouter.post('/create-patient-account', clinicianController.createPatient)

clinicianRouter.get('/create-new-account', clinicianController.createAccountPage)
clinicianRouter.post('/create-clinician', clinicianController.createClinician)

clinicianRouter.get('/view-patient-comments', clinicianController.getPatientcomments)

clinicianRouter.get('/account-info', accountModController.getAccountDetail)
clinicianRouter.post('/change-account-detail', accountModController.changeAccountDetail)
// onwards to other routers!
clinicianRouter.use('/:id', require('./managePatientRouter'))

module.exports = clinicianRouter
