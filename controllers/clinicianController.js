const mongoose = require('mongoose')
const Clinician = require('../models/clinician')
const Patient = require('../models/patient')

// Chris
const my_clinician_id = mongoose.Types.ObjectId("62628af9ef4acecb2d31a9e6")

// prolly more suited for clinician but eh testing
const getAllClinicianData = async (req, res, next) => {
    try {
        const clinicians = await Clinician.find().lean()
        return res.render('allPatients', {data: clinicians, layout: 'clinician_main' })
    } catch (err) {
        return next(err)
    }   
}

const logInPage = async (req, res, next) => {
    try {
        return res.render('signInPage', { layout: 'clinician_main' })
    } catch (err) {
        return next(err)
    }   
}

const getAllPatientData = async (req, res, next) => {
    try {
        //const patients = await Clinician.find({_id: my_clinician_id}, {patients})
        //return res.render('allPatients', {data: patients, layout: 'patient_main' })
        return res.render('clinicianDashboard', {layout: 'clinician_main' })
    } catch (err) {
        return next(err)
    }   
}

const createAccountPage = async (req, res, next) => {
    try {
        return res.render('createClinicianAccount', {layout: 'clinician_main' })
    } catch (err) {
        return next(err)
    }
}

const createPatientPage = async (req, res, next) => {
    try {
        return res.render('createPatientAccount', {layout: 'clinician_main' })
    } catch (err) {
        return next(err)
    }
}

const createClinician = async (req, res, next) => {
    try {
        newClinician = new Clinician( req.body )
        await newClinician.save(function (err) {
            if (err) return console.error(err);
        })
        //await Clinician.create(newClinician);
        return res.redirect('/clinician/create-new-account')
    } catch (err) {
        return next(err)
    }
}

const createPatient = async (req, res, next) => {
    try {
        newPatient = new Patient( 
            {patient_name: req.body.patient_name,
            clinician_id: my_clinician_id,}
         )
        await newPatient.save(function (err) {
            if (err) return console.error(err);
        })
        await Clinician.updateOne(
            {_id: my_clinician_id}, 
            {$push: {patients: newPatient}})
        return res.redirect('/clinician/create-patient-account')
    } catch (err) {
        return next(err)
    }
}

const setTimeseriesPage = async (req, res, next) => {
    try {
        return res.render('setTimeseries', {layout: 'clinician_main' })
    } catch (err) {
        return next(err)
    }
}

const newTimeseries = async (req, res, next) => {
    try {
        var timeseries= {            
        }
        return res.redirect('/clinician/set-timeseries')
    } catch (err) {
        return next(err)
    }
}

module.exports = {
    logInPage,
    getAllClinicianData,
    getAllPatientData,
    createAccountPage,
    createPatientPage,
    setTimeseriesPage,
    newTimeseries,
    createClinician,
    createPatient,
}