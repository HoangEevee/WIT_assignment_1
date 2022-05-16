// add router
const passport = require('passport')
const express = require('express')
const mainRouter = express.Router()

// connect to controller
const mainController = require('../controllers/mainController.js')

mainRouter.get("/", mainController.getMainPage)
mainRouter.get("/about-diabetes",mainController.getAboutDiabetes)
mainRouter.get("/about-website", mainController.getAboutWebsite)
mainRouter.get("/who-are-you", mainController.getSignin)

mainRouter.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})
// onwards to other routers!
mainRouter.use('/patient', require('./patientRouter'))
mainRouter.use('/clinician', require('./clinicianRouter'))

module.exports = mainRouter
