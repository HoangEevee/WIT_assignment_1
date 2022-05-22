// add router
const passport = require('passport')
const express = require('express')
const patientRouter = express.Router()
const isAuthenticated = require("../utils/helper").isAuthenticated
// connect to controller
const patientController = require('../controllers/patientController.js')

patientRouter.get('/home', patientController.getHomePage)
patientRouter.get('/about-diabetes', patientController.getAboutDiabetes)
patientRouter.get('/about-website', patientController.getAboutWebsite)

// onwards to other routers!
patientRouter.use('/account', require('./patientAccountRouter'))
patientRouter.use('/achievements', require('./achievementRouter'))

module.exports = patientRouter


