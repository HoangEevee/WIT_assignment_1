// add router
const express = require('express')
const managePatientRouter = express.Router({mergeParams: true})

// connect to controller
const managePatientController = require('../controllers/managePatientController.js')

managePatientRouter.get('/', managePatientController.getOnePatientData)

managePatientRouter.get('/set-timeseries', managePatientController.setTimeseriesPage)
managePatientRouter.post('/new-timeseries', managePatientController.newTimeseries)
managePatientRouter.post('/new-threshold', managePatientController.setThreshold)
managePatientRouter.get('/send-support-messages', managePatientController.getsupportmessages)
managePatientRouter.post('/send-support-messages', managePatientController.sendSupportmessages)
managePatientRouter.get('/view-clinical-notes', managePatientController.getClinicalNotes)

// yet to be implemented
// NOTE: add whatever method after the controller + add any post routes
// These routes only follow what Quynh suggested
//managePatientRouter.get('/support-messages', managePatientController)
//managePatientRouter.get('/patient-info', managePatientController)

module.exports = managePatientRouter