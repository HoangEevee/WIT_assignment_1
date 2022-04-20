const mongoose = require('mongoose')
const Patient = require('../models/patient')
const Clinician = require('../models/clinician')

// prolly more suited for clinician but eh testing
const getAllPatientData = async (req, res, next) => {
    try {
        const patients = await Patient.find().lean()
        return res.render('allPatients', {data: patients, layout: 'patient_main' })
    } catch (err) {
        return next(err)
    }   
}

const getDataByPatient = async (req, res, next) => {
    // connect to database
    //req = db.patients.findOne({_id: mongoose.Types.ObjectId('625f871de48eff0202cf9279')});
    try {
        // hard code Pat
        //const patient = await Patient.findById(req.params.patient_id).lean()
        const patient = await Patient.findById(mongoose.Types.ObjectId('625f871de48eff0202cf9279')).lean()
        if (!patient) {
            // patient not in db
            return res.sendStatus(404)
        }
        // found patient
        return res.render('patientData', { oneItem: patient, layout: 'patient_main' })
    } catch (err) {
        return next(err)
    }
}

const getRecordDataForm = async (req, res, next) => {
    try {
        //const patient = await Patient.findById(mongoose.Types.ObjectId('625f871de48eff0202cf9279')).lean()
        return res.render('recordHealth', { layout: 'patient_main' })
    } catch (err) {
        return next(err)
    }
}

const insertGlucose = async (req, res, next) => {
    try {
        const today = Date()
        const patient_id = mongoose.Types.ObjectId('625f871de48eff0202cf9279')
        console.log(Patient.find({_id: patient_id}, {health_data: {$elemMatch:{date: today}}}))
        if (Patient.find({_id: patient_id}, {health_data: {$elemMatch:{date: today}}}, {})) {
            Patient.updateOne({_id: patient_id}, {health_data: {$push: {date: today}}})
            console.log("in")
        }
        Patient.updateOne({_id: patient_id, health_data: {$elemMatch:{date: today}}}, { $set: {glucose: req.body.glucose}})
        if (req.body.comment_glucose) {
            Patient.updateOne({_id: patient_id, health_data: {$elemMatch:{date: today}}},  { $set: {comment: req.body.comment}})
            console.log("in2")
        }
        //await Patient.save()
        return res.redirect('/patient/record_data_form')
    } catch (err) {
        return next(err)
    }
}

module.exports = {
    getAllPatientData,
    getDataByPatient,
    getRecordDataForm,
    insertGlucose,
}
