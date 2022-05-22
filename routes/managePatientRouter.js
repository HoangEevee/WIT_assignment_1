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
managePatientRouter.get('/clinician-support-messages', managePatientController.getclinicianSuppportmessages)
managePatientRouter.get('/view-clinical-notes', managePatientController.getClinicalNotes)
managePatientRouter.get('/create-new-note', managePatientController.newClinicalNote)
managePatientRouter.post('/create-new-note', managePatientController.setClinicalNote)
managePatientRouter.get('/past-health', managePatientController.viewPatientHealth)

module.exports = managePatientRouter