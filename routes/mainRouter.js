// add router
const passport = require('passport')
const express = require('express')
const mainRouter = express.Router()

// connect to controller
const mainController = require('../controllers/mainController.js')

mainRouter.get("/", mainController.getMainPage)
mainRouter.get("/about-diabetes",mainController.getAboutDiabetes)
mainRouter.get("/about-website", mainController.getAboutWebsite)
//mainRouter.get("/who-are-you", mainController.getSignin)

//handle signin logout
mainRouter.get('/signin', mainController.getSignin)
mainRouter.post('/login',
passport.authenticate('local', {
    failureRedirect: '/signin', failureFlash: true
}),
(req, res) => { 
    console.log('user ' + req.user.username + ' logged in with role ' + req.user.role)     // for debugging
    if (req.user.role === "clinician") {
        res.redirect('/clinician/dashboard')   // login was successful, send user to home pag
    }
    else if (req.user.role === "patient") {
        res.redirect("/patient/home")
    }
}   
)
mainRouter.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

// onwards to other routers!
mainRouter.use('/patient', require('./patientRouter'))
mainRouter.use('/clinician', require('./clinicianRouter'))

module.exports = mainRouter
