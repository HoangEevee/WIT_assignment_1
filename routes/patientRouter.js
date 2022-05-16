// add router
const passport = require('passport')
const express = require('express')
const patientRouter = express.Router()
const isAuthenticated = require("../utils/helper").isAuthenticated
// connect to controller
const patientController = require('../controllers/patientController.js')

// localhost:8080/patient*** where *** is the following
patientRouter.get('/', patientController.logInPage)
patientRouter.post('/login',
passport.authenticate('local', {
    successRedirect: '/patient/home', failureRedirect: '/patient', failureFlash: true
}))

patientRouter.get('/home', isAuthenticated, patientController.getHomePage)
patientRouter.get('/about-diabetes', patientController.getAboutDiabetes)
patientRouter.get('/about-website', patientController.getAboutWebsite)
patientRouter.get('/view-support-messages',patientController.getSupportmessages)


// yet to be implemented
// NOTE: add whatever method after the controller + add any post routes
// These routes only follow what Quynh suggested
// patientRouter.get('/support-messages', patientController)
// patientRouter.get('/settings', patientController)

// onwards to other routers!
patientRouter.use('/account', isAuthenticated, require('./patientAccountRouter'))
patientRouter.use('/achievements',  isAuthenticated, require('./achievementRouter'))

module.exports = patientRouter


