// add router
const express = require('express')
const mainRouter = express.Router()

// connect to controller
const mainController = require('../controllers/mainController.js')

mainRouter.get("/", mainController.getMainPage)
mainRouter.get("/about-diabetes",mainController.getAboutDiabetes)
mainRouter.get("/about-website", mainController.getAboutWebsite)
mainRouter.get("/who-are-you", mainController.getSignin)

// onwards to other routers!
mainRouter.use('/patient', require('./patientRouter'))
mainRouter.use('/clinician', require('./clinicianRouter'))

module.exports = mainRouter
