const mongoose = require('mongoose')
const Clinician = require('../models/clinician')
const Patient = require('../models/patient')
const helpers = require('../utils/helper')

const getOnePatientData = async (req, res, next) => {
    try {
        const patient = await Patient.findById(req.params.id).lean()
        helpers.changePatientTimestampFormat(patient.timeseries)
        return res.render('onePatient', {data: patient, layout: 'clinician_main'})
        
    } catch (err) {
        return next(err)
    }   
}

const setTimeseriesPage = async (req, res, next) => {
    try {
        const patient = await Patient.findById(req.params.id).lean()
        return res.render('setTimeseries', {data: patient,layout: 'clinician_main' })
    } catch (err) {
        return next(err)
    }
}

const newTimeseries = async (req, res, next) => {
    try {
        const patient = await Patient.findById(req.params.id).lean()
        // XOR: how to find the feature with the changed state
        await Patient.updateOne({
            _id: req.params.id
        }, {
            $set: {
                "glucoseRecord": Boolean(req.body.glucose) != patient.glucoseRecord,
                "weightRecord": Boolean(req.body.weight) != patient.weightRecord,
                "insulinRecord": Boolean(req.body.insulin) != patient.insulinRecord,
                "exerciseRecord": Boolean(req.body.exercise) != patient.exerciseRecord,
            }
        })
        return res.redirect('/clinician/'.concat(req.params.id.toString(), '/set-timeseries'))
    } catch (err) {
        return next(err)
    }
}

const setThreshold = async (req, res, next) => {
    try {

        let patient = await Patient.findOne({_id: req.params.id});

        let glucoseLower = req.body.glucose_lower || patient["glucoseThreshold"]["lower"] || 0
        let glucoseUpper = req.body.glucose_upper || patient["glucoseThreshold"]["upper"] || 0


        let weightLower = req.body.weight_lower || patient["weightThreshold"]["lower"] || 0
        let weightUpper = req.body.weight_upper || patient["weightThreshold"]["upper"] || 0

        let insulinLower = req.body.insulin_lower || patient["insulinThreshold"]["lower"] || 0
        let insulinUpper = req.body.insulin_upper || patient["insulinThreshold"]["upper"] || 0

        let exerciseLower = req.body.exercise_lower || patient["exerciseThreshold"]["lower"] || 0
        let exerciseUpper = req.body.exercise_upper || patient["exerciseThreshold"]["upper"] || 0

        if (glucoseLower > glucoseUpper || weightLower > weightUpper || 
            insulinLower > insulinUpper || exerciseLower > exerciseUpper) {
            return res.redirect('/clinician/'.concat(req.params.id.toString(), '/set-timeseries'));
        }

        patient["glucoseThreshold"]["lower"] = glucoseLower
        patient["glucoseThreshold"]["upper"] = glucoseUpper
        patient["weightThreshold"]["lower"] = weightLower
        patient["weightThreshold"]["upper"] = weightUpper
        patient["insulinThreshold"]["lower"] = insulinLower
        patient["insulinThreshold"]["upper"] = insulinUpper
        patient["exerciseThreshold"]["lower"] = exerciseLower
        patient["exerciseThreshold"]["upper"] = exerciseUpper

        await patient.save()

        return res.redirect('/clinician/'.concat(req.params.id.toString(), '/set-timeseries'))
    } catch (err) {
        return next(err)
    }
}

const getClinicalNotes = async (req, res, next) => {
    try{
        const patient = await Patient.findById(req.params.id).lean()
        return res.render('ClinicalNotes', {data: patient, layout: 'clinician_main'})
    } catch (err) {
        return next(err)
    }
}

const getsupportmessages = async (req, res, next) => {
    try {
        const patient = await Patient.findById(req.params.id).lean()
        return res.render('sendsupportmessage', {data: patient, layout: 'clinician_main'})
    } catch (err) {
        return next(err)
    }
} 

const sendSupportmessages = async (req, res, next) => {
    try {
        const patient_id = req.params.id
        await Patient.updateOne({
            _id: patient_id,
        }, {$set: {
                "supportMessages": req.body.supportmessage
            }
        })

        return res.redirect("/clinician/".concat(req.params.id.toString(), '/send-support-messages'))
    } catch (err) {
        return next(err)
    }
} 

module.exports = {
    getOnePatientData,
    setTimeseriesPage,
    newTimeseries,
    setThreshold,
    getClinicalNotes,
    getsupportmessages,
    sendSupportmessages,
}
