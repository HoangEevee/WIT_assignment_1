const mongoose = require('mongoose')
const Clinician = require('../models/clinician')
const Patient = require('../models/patient')

// Pat
//const my_patient_id = mongoose.Types.ObjectId("62713910a76e24742ae2aa9d")
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


const getHomePage = async (req, res, next) => {
    try {
        return res.render('patientHome', { layout: 'patient_main' })
    } catch (err) {
        return next(err)
    }   
}


const getSupportmessages = async (req, res, next) => {
    try {
        const clinician_id = req.user.data_id
        const clinician = await Clinician.findOne({
            _id: clinician_id,
        }).lean()
        const patients = await Patient.find().lean()
        return res.render('viewsupportmessages', {data: patients, clinciandata: clinician, layout: 'patient_main'})
    } catch (err) {
        return next(err)
    }
} 

module.exports = {
    getAllPatientData,
    getAboutDiabetes,
    getAboutWebsite,
    getHomePage,
    getSupportmessages, 
}







