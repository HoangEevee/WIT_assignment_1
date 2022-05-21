const mongoose = require('mongoose')
const Clinician = require('../models/clinician')
const Patient = require('../models/patient')
const Account = require('../models/account')
const helpers = require('../utils/helper')

//const my_clinician_id = mongoose.Types.ObjectId("62713547ab750c0e07f6387f")

// prolly more suited for clinician but eh testing
const getAllClinicianData = async (req, res, next) => {
    try {
        const clinicians = await Clinician.find().lean()
        return res.render('allPatients', {data: clinicians, layout: 'clinician_main' })
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
            helpers.changeLastTimestampFormat(element.lastUpdated)
            if (element.timeseries.length) {
                element.timeseries = element.timeseries[element.timeseries.length-1]
            }
        })
        const today = new Date()
        return res.render('allPatients', {today: today.toLocaleDateString(), data: patients, layout: 'clinician_main'})
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
        return res.render('createPatientAccount', {layout: 'clinician_main' , flash:req.flash('error')})
    } catch (err) {
        return next(err)
    }
}

const getPatientcomments = async (req, res, next) => {
    try {
        const patients = await Patient.find().lean()
        return res.render('viewpatientcomments', {data: patients, layout: 'clinician_main'})
    } catch (err) {
        return next(err)
    }
} 

const createPatient = async (req, res, next) => {
    try {
        //id associated with the account id
        const clinician_id = req.user.data_id
        
        const today = new Date()
        //Validations
        let flashMessage = "You HTML meddler have input"
        if (!helpers.isEmail(req.body.email)) flashMessage +=" invalid email"
        if (!Number.isInteger(parseFloat(req.body.contactNumber)) || !Number.isInteger(parseFloat(req.body.emergencyNumber))) {
            flashMessage +=" invalid phone number"
        }

        if (!["mr","miss","mrs","ms", "mx", "other"].includes(req.body.title)) flashMessage += " invalid title" 
        if (!helpers.isDate(req.body.dob)) flashMessage += " invalid birthday"

        if (flashMessage !== "You HTML meddler have input") {
            req.flash("error", flashMessage)
            return res.redirect('/clinician/create-patient-account')
        }

        //new patient for the patient database
        newPatient = new Patient( {...req.body, clinicianId: clinician_id, registeredDate: today})

        await newPatient.save(function (err) {
            if (err) return console.error(err);
        })
        
        //new account for the account database
        newAccount = new Account( {...req.body, role: "patient", data_id: newPatient._id})
        await newAccount.save(function (err) {
            if (err) return console.error(err);
        })
        
        await Clinician.updateOne(
            {_id: clinician_id}, 
            {$push: {patients: newPatient}}
        )

        await Patient.updateOne({
            _id: newPatient._id
        }, {
            $set: {
              "glucoseThreshold.lower": 0,
              "glucoseThreshold.upper": 0,
              "exerciseThreshold.lower": 0,
              "exerciseThreshold.upper": 0,
              "insulinThreshold.lower": 0,
              "insulinThreshold.upper": 0,
              "weightThreshold.lower": 0,
              "weightThreshold.upper": 0,
            }
        })
        return res.redirect('/clinician/create-patient-account')
    } catch (err) {
        return next(err)
    }
}

module.exports = {
    getAllClinicianData,
    getAllPatientData,
    createAccountPage,
    createPatientPage,
    createClinician,
    getPatientcomments, 
    createPatient,
}