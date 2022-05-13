const mongoose = require('mongoose')
const Clinician = require('../models/clinician')
const Patient = require('../models/patient')
const helpers = require('../utils/helper')

const my_clinician_id = mongoose.Types.ObjectId("62713547ab750c0e07f6387f")

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
        return res.render('signInPageClinician', { layout: 'main' })
    } catch (err) {
        return next(err)
    }   
}

//this is not in use
const logIn = async (req, res, next) => {
    try {
        return res.redirect("./dashboard")
    } catch (err) {
        return next(err)
    }
}

const getAllPatientData = async (req, res, next) => {
    try {
        //id associated with the account id
        const clinician_id = req.user.data_id

        const ids = await Clinician.findById(clinician_id).lean()
        const patients = await Patient.find({ '_id': { $in: ids.patients } }).lean();
        //show time as DD/MM/YYYY, HH:MM:SS
        patients.forEach((element) => {
            helpers.changeLastTimestampFormat(element.glucoseTimestamp)
        })
        return res.render('allPatients', {data: patients, layout: 'clinician_main'})
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

const createClinician = async (req, res, next) => {
    try {
        newClinician = new Clinician( req.body )
        await newClinician.save(function (err) {
            if (err) return console.error(err);
        })
        return res.redirect('/clinician/create-new-account')
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


const createPatient = async (req, res, next) => {
    try {
        newPatient = new Patient( {...req.body, clinicianId: my_clinician_id} )
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

module.exports = {
    logInPage,
    logIn,
    getAllClinicianData,
    getAllPatientData,
    createAccountPage,
    createPatientPage,
    createClinician,
    createPatient,
}