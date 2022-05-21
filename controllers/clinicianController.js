const mongoose = require('mongoose')
const Clinician = require('../models/clinician')
const Patient = require('../models/patient')
const Account = require('../models/account')
const helpers = require('../utils/helper')

const getAllPatientData = async (req, res, next) => {
    try {
        //id associated with the account id
        const clinician_id = req.user.data_id

        const ids = await Clinician.findById(clinician_id).lean()
        const patients = await Patient.find({ '_id': { $in: ids.patients } }).lean();
        //show time as DD/MM/YYYY, HH:MM:SS
        patients.forEach((element) => {
            helpers.changeLastTimestampFormat(element.lastUpdated)
            if (element.timeseries.length) {
                element.timeseries = element.timeseries[element.timeseries.length-1]
            }
        })
        const today = new Date()
        return res.render('allPatients', {today: today.toLocaleDateString(), data: patients, layout: 'clinician_main', theme: req.user.theme})
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
        return res.render('createPatientAccount', {layout: 'clinician_main', theme:req.user.theme, flash:req.flash('error')})
    } catch (err) {
        return next(err)
    }
}

const getPatientcomments = async (req, res, next) => {
    try {
        const clinician_id = req.user.data_id

        const ids = await Clinician.findById(clinician_id).lean()
        const patients = await Patient.find({ '_id': { $in: ids.patients } }).lean();
        //show time as DD/MM/YYYY, HH:MM:SS
        patients.forEach((patient) => {
            patient.lastComments.forEach((element) => {
                element.timestamp = element.timestamp.toLocaleString()
            })
        })
        return res.render('viewpatientcomments', {data: patients, layout: 'clinician_main', theme:req.user.theme})
    } catch (err) {
        return next(err)
    }
} 

const createPatient = async (req, res, next) => {
    try {
        //Validations
        let flashMessages = []
        const msgTemplate = "Get out of my HTML with your "
        if (!helpers.isEmail(req.body.email)) flashMessages.push(msgTemplate + "invalid email!")
        if (!Number.isInteger(parseFloat(req.body.contactNumber)) || !Number.isInteger(parseFloat(req.body.emergencyNumber))) {
            flashMessages.push(msgTemplate + "invalid phone number!")
        }
        if (!["mr","miss","mrs","ms", "mx", "other"].includes(req.body.title)) flashMessages.push(msgTemplate + "invalid phone number!")
        if (!helpers.isDate(req.body.dob)) flashMessages.push(msgTemplate + "invalid birthday!")
        if (await Account.findOne({'username': req.body.username}).lean()) flashMessages.push("Your username has already been taken.")

        if (flashMessages.length !== 0) {
            req.flash("error", flashMessages)
            return res.redirect('/clinician/create-patient-account')
        }
        
        //id associated with the account id
        const clinician_id = req.user.data_id
        const today = new Date()
        //new patient for the patient database
        newPatient = new Patient( {...req.body, clinicianId: clinician_id, registeredDate: today, 
            glucoseThreshold: {
                lower:0, upper:0
            }, 
            exerciseThreshold: {
                lower:0, upper:0
            },
            insulinThreshold: {
                lower:0, upper:0
            }, 
            weightThreshold: {
                lower:0, upper:0
            }
        })

        await newPatient.save(function (err) {
            if (err) return console.error(err);
        })
        
        //new account for the account database
        newAccount = new Account( {...req.body, role: "patient", data_id: newPatient._id, theme: "light"})
        await newAccount.save(function (err) {
            if (err) return console.error(err);
        })
        
        await Clinician.updateOne(
            {_id: clinician_id}, 
            {$push: {patients: newPatient}}
        )

        return res.redirect('/clinician/create-patient-account')
    } catch (err) {
        return next(err)
    }
}

module.exports = {
    getAllPatientData,
    createAccountPage,
    createPatientPage,
    createClinician,
    getPatientcomments, 
    createPatient,
}