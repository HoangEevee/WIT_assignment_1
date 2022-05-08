// add router
const express = require('express')
const patientRouter = express.Router()

// connect to controller
const patientController = require('../controllers/patientController.js')

// localhost:8080/patient*** where *** is the following
patientRouter.get('/', patientController.logInPage)
patientRouter.post('/login', patientController.logIn)

patientRouter.get('/home', patientController.getHomePage)
patientRouter.get('/about-diabetes', patientController.getAboutDiabetes)
patientRouter.get('/about-website', patientController.getAboutWebsite)

// yet to be implemented
// NOTE: add whatever method after the controller + add any post routes
// These routes only follow what Quynh suggested
// patientRouter.get('/support-messages', patientController)
// patientRouter.get('/settings', patientController)

// onwards to other routers!
patientRouter.use('/account', require('./patientAccountRouter'))
patientRouter.use('/achievements', require('./achievementRouter'))

module.exports = patientRouter


