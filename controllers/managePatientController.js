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
        // lowerbound
        if (req.body.glucose_lower) {
            await Patient.updateOne({
                _id: req.params.id
            }, {
                $set: {
                  "glucoseThreshold.lower": req.body.glucose_lower
                }
            })
        } else if (req.body.weight_lower) {
            await Patient.updateOne({
                _id: req.params.id
            }, {
                $set: {
                  "weightThreshold.lower": req.body.weight_lower
                }
            })
        } else if (req.body.insulin_lower) {
            await Patient.updateOne({
                _id: req.params.id
            }, {
                $set: {
                  "insulinThreshold.lower": req.body.insulin_lower
                }
            })
        } else if (req.body.exercise_lower) {
            await Patient.updateOne({
                _id: req.params.id
            }, {
                $set: {
                  "exerciseThreshold.lower": req.body.exercise_lower
                }
            })
        }
        // upperbound
        if (req.body.glucose_upper) {
            await Patient.updateOne({
                _id: req.params.id
            }, {
                $set: {
                  "glucoseThreshold.upper": req.body.glucose_upper
                }
            })
        } else if (req.body.weight_upper) {
            await Patient.updateOne({
                _id: req.params.id
            }, {
                $set: {
                  "weightThreshold.upper": req.body.weight_upper
                }
            })
        } else if (req.body.insulin_upper) {
            await Patient.updateOne({
                _id: req.params.id
            }, {
                $set: {
                  "insulinThreshold.upper": req.body.insulin_upper
                }
            })
        } else if (req.body.exercise_upper) {
            await Patient.updateOne({
                _id: req.params.id
            }, {
                $set: {
                  "exerciseThreshold.upper": req.body.exercise_upper
                }
            })
        }
        return res.redirect('/clinician/'.concat(req.params.id.toString(), '/set-timeseries'))
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
        /*const patient_id = req.user.data_id;
        let patient = await Patient.findOne({_id: patient_id});*/

        const patient = await Patient.findById(req.params.id).lean()
        patient["supportmessage"] = req.body.supportmessage;
        return res.redirect("/clinician/send-support-messages")
    } catch (err) {
        return next(err)
    }
} 

module.exports = {
    getOnePatientData,
    setTimeseriesPage,
    newTimeseries,
    setThreshold,
    getsupportmessages,
    sendSupportmessages,
}
