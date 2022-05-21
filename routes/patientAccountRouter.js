// add router
const express = require('express')
const patientAccountRouter = express.Router()

// connect to controller
const patientAccountController = require('../controllers/patientAccountController.js')
const accountModController = require('../controllers/accountModController.js')

patientAccountRouter.get('/', patientAccountController.getPersonal)
patientAccountRouter.get('/past-health', patientAccountController.getPastHealth)
patientAccountRouter.get('/record-health-form', patientAccountController.getRecordDataForm)
patientAccountRouter.post('/insert-health-data', patientAccountController.insertHealthData)
patientAccountRouter.get('/account-info', accountModController.getAccountDetail)
patientAccountRouter.post('/change-account-detail', accountModController.changeAccountDetail)
module.exports = patientAccountRouter