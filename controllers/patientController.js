const mongoose = require('mongoose')
const Patient = require('../models/patient')

// Pat
const my_patient_id = mongoose.Types.ObjectId("62713910a76e24742ae2aa9d")
// prolly more suited for clinician but eh testing
const getAllPatientData = async (req, res, next) => {
    try {
        const patients = await Patient.find().lean()
        return res.render('allPatients', {data: patients, layout: 'patient_main' })
    } catch (err) {
        return next(err)
    }   
}

const getAboutDiabetes = (req, res, next) => {
    try{
        res.render('aboutDiabetes', {layout: 'patient_main'})
    } catch (err) {
        next(err)
    }
}

const getAboutWebsite = (req, res, next) => {
    try{
        res.render('aboutWebsite', {layout: 'patient_main'})
    } catch (err) {
        next(err)
    }
}

const logInPage = async (req, res, next) => {
    try {
        return res.render('signInPage', { layout: 'main' })
    } catch (err) {
        return next(err)
    }   
}

//this is not in use
const logIn = async (req, res, next) => {
    try {
        return res.redirect("/patient/home")
    } catch (err) {
        return next(err)
    }
}

const getHomePage = async (req, res, next) => {
    try {
        return res.render('patientHome', { layout: 'patient_main' })
    } catch (err) {
        return next(err)
    }   
}

module.exports = {
    getAllPatientData,
    getAboutDiabetes,
    getAboutWebsite,
    logInPage,
    logIn,
    getHomePage,
}
