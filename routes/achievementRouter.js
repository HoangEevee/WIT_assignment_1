// add router
const express = require('express')
const achievementRouter = express.Router()

// connect to controller
const achievementController = require('../controllers/achievementController.js')

// NOTE: add whatever method after the controller + add any post routes
// These routes only follow what Quynh suggested
//achievementRouter.get('/', achievementController) 
//achievementRouter.get('/leaderboard', achievementController) 
//achievementRouter.get('/badges', achievementController) 

module.exports = achievementRouter

