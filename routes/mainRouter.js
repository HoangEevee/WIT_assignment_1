// add router
const express = require('express')
const mainRouter = express.Router()

// connect to controller
const mainController = require('../controllers/mainController.js')

mainRouter.get("/", mainController.getMainPage)
mainRouter.get("/aboutDiabetes",mainController.getAboutDiabetes)
mainRouter.get("/aboutWebsite", mainController.getAboutWebsite)
mainRouter.get("/whoAreYou", mainController.getSignin)
module.exports = mainRouter
