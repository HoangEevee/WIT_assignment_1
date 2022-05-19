const mongoose = require('mongoose')
const Patient = require('../models/patient')
const Clinician = require('../models/clinician')
const helpers = require('../utils/helper')

// Pat
//const my_patient_id = mongoose.Types.ObjectId("62713910a76e24742ae2aa9d")

const getDataByPatient = async (req, res, next) => { 
    try{
        const patient_id = req.user.data_id
        const patient = await Patient.findById(patient_id).lean()
        return res.render('patientData', {oneItem: patient, layout: 'patient_main'})
    } catch (err) {
        return next(err)
    }
}

const getPersonal = async (req, res, next) => {
    try {
        return res.render('patientYourAccount', { layout: 'patient_main' })
    } catch (err) {
        return next(err)
    }   
}

const getPastHealth = async(req, res, next) => {
    try {
        const patient_id = req.user.data_id
        const patient = await Patient.findById(patient_id).lean()
        helpers.changePatientTimestampFormat(patient.timeseries)
        return res.render('patientPastHealth', {data: patient, layout: 'patient_main'})
    } catch(err) {
        return next(err)
    }
}

const getRecordDataForm = async (req, res, next) => {
    try {
        const today_start = helpers.getTodayStart()

        // Making the "submitted" ticks appear individually
        const patient_id = req.user.data_id
        var date_result = {}
        date_result = await Patient.findOne({
            _id: patient_id,
            timeseries: {
                $elemMatch: {
                    date: today_start
                }
            }
        },
        {
            'timeseries.$': 1
        }).lean()
        // record it in object
        var submit = {}
        if (date_result) {
            timeseries = date_result.timeseries[0]
            submit = {
                glucose: (timeseries.glucose != null),
                weight: (timeseries.weight != null),
                insulin: (timeseries.insulin != null),
                exercise: (timeseries.exercise != null),
            }
        } else {
            submit = {
                glucose: false,
                weight: false,
                insulin: false,
                exercise: false,
            }
        }
        var patient_data = await Patient.findOne({_id: patient_id}).lean()
        //show time as DD/MM/YYYY, HH:MM:SS
        helpers.changeLastTimestampFormat(patient_data.lastUpdated)

        return res.render('recordHealth', { submitted: submit, patient: patient_data, layout: 'patient_main' })
    } catch (err) {
        return next(err)
    }
}

const insertHealthData = async (req, res, next) => {
    try {
        const today = new Date()
        const today_start = helpers.getTodayStart()
        const patient_id = req.user.data_id
        timeseries_today = await Patient.findOne({
            id: patient_id,
            timeseries: {
                $elemMatch: {
                    date: today_start
                }
            }
        }, {
            _id: 0,
            'timeseries.$': 1
        }).lean()
        // if no data is entered today yet... UNTIL NOW!
        if (!timeseries_today) {
            await Patient.updateOne({
                _id: patient_id
            }, {
                $push: {
                    timeseries: {date: today_start}
                }
            })
        }
        // enter the individual data
        if (req.body.glucose) {
            await Patient.updateOne({
                _id: patient_id,
                timeseries: {
                    $elemMatch: {
                        date: today_start
                    }
                }
            }, {
                $set: {
                    'timeseries.$.glucose': {time: today, value: req.body.glucose, message: req.body.comment},
                    'lastUpdated.glucose': today
                }
            })
        } else if (req.body.weight) {
            await Patient.updateOne({
                _id: patient_id,
                timeseries: {
                    $elemMatch: {
                        date: today_start
                    }
                }
            }, {
                $set: {
                    'timeseries.$.weight': {time: today, value: req.body.weight, message: req.body.comment},
                    'lastUpdated.weight': today
                }
            })
        } else if (req.body.insulin) {
            await Patient.updateOne({
                _id: patient_id,
                timeseries: {
                    $elemMatch: {
                        date: today_start
                    }
                }
            }, {
                $set: {
                    'timeseries.$.insulin': {time: today, value: req.body.insulin, message: req.body.comment},
                    'lastUpdated.insulin': today
                }
            })
        } else if (req.body.exercise) {
            await Patient.updateOne({
                _id: patient_id,
                timeseries: {
                    $elemMatch: {
                        date: today_start
                    }
                }
            }, {
                $set: {
                    'timeseries.$.exercise': {time: today, value: req.body.exercise, message: req.body.comment},
                    'lastUpdated.exercise': today
                }
            })
        }
        return res.redirect('/patient/account/record-health-form')
    } catch (err) {
        return next(err)
    }
}

module.exports = {
    getDataByPatient,
    getPersonal,
    getPastHealth,
    getRecordDataForm,
    insertHealthData,
}