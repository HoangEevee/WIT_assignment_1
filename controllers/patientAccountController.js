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
        helpers.changePatientTimestampFormat(patient.glucoseTimestamp)
        return res.render('patientPastHealth', {data: patient, layout: 'patient_main'})
    } catch(err) {
        return next(err)
    }
}

const getRecordDataForm = async (req, res, next) => {
    try {
        // It's called "today" but it will be modified to not be that way
        const today = new Date()
        
        // Check Melb time to UTC
        if (today.getUTCHours < today.getTimezoneOffset()) {
            today.setDate(today.getDate()+1)
        }

        const today_start = new Date(today.setHours(0,0,0,0))
        const tmr_start = new Date(today.setDate(today.getDate()+1))

        // Making the "submitted" ticks appear individually
        const attributes = ['glucose', 'weight', 'insulin', 'exercise']
        
        const patient_id = req.user.data_id
        var date_result = {}
        date_result[attributes[0]] = await Patient.findOne({
            _id: patient_id,
            glucoseTimestamp: {
                $elemMatch: {
                    time: {
                        $gte: today_start,
                        $lt: tmr_start,
                    }
                }
            }
        },
        {
            'glucoseTimestamp.$' : 1
        }).lean()
        date_result[attributes[1]] = await Patient.findOne({
            _id: patient_id,
            weightTimestamp: {
                $elemMatch: {
                    time: {
                        $gte: today_start,
                        $lt: tmr_start,
                    }
                }
            }
        },
        {
            'weightTimestamp.$' : 1
        }).lean()
        date_result[attributes[2]] = await Patient.findOne({
            _id: patient_id,
            insulinTimestamp: {
                $elemMatch: {
                    time: {
                        $gte: today_start,
                        $lt: tmr_start,
                    }
                }
            }
        },
        {
            'insulinTimestamp.$' : 1
        }).lean()
        date_result[attributes[3]] = await Patient.findOne({
            _id: patient_id,
            exerciseTimestamp: {
                $elemMatch: {
                    time: {
                        $gte: today_start,
                        $lt: tmr_start,
                    }
                }
            }
        },
        {
            'exerciseTimestamp.$' : 1
        }).lean()

        var submit = {}
        for (let i = 0; i < 4; i++) {
            submit[attributes[i]] = (date_result[attributes[i]]!=null)
        }

        var patient_data = await Patient.findOne({_id: patient_id}).lean()
        //show time as DD/MM/YYYY, HH:MM:SS
        helpers.changeLastTimestampFormat(patient_data.glucoseTimestamp)
        helpers.changeLastTimestampFormat(patient_data.weightTimestamp)
        helpers.changeLastTimestampFormat(patient_data.insulinTimestamp)
        helpers.changeLastTimestampFormat(patient_data.exerciseTimestamp)

        return res.render('recordHealth', { submitted: submit, patient: patient_data, layout: 'patient_main' })
    } catch (err) {
        return next(err)
    }
}

const insertHealthData = async (req, res, next) => {
    try {
        const today = new Date()
        const patient_id = req.user.data_id
        last_entered = await Patient.findOne({
            id: patient_id
        }, {
            _id: 0,
            timestampedDates: 1
        })
        last_date = last_entered.timestampedDates
        if (!last_date.length 
            || (today.toLocaleDateString().localeCompare(last_date[last_date.length-1].toLocaleDateString()) > 0)) {
            await Patient.updateOne({
                id: patient_id
            }, {
                $push: {
                    timestampedDates: today
                }
            })
        }

        if (req.body.glucose) {
            await Patient.updateOne({
                _id: patient_id
            }, {
                $push: {
                    glucoseTimestamp: {time: today, value: req.body.glucose, message: req.body.comment}
                }
            })
        } else if (req.body.weight) {
            await Patient.updateOne({
                _id: patient_id
            }, {
                $push: {
                    weightTimestamp: {time: today, value: req.body.weight, message: req.body.comment}
                }
            })
        } else if (req.body.insulin) {
            await Patient.updateOne({
                _id: patient_id
            }, {
                $push: {
                    insulinTimestamp: {time: today, value: req.body.insulin, message: req.body.comment}
                }
            })
        } else if (req.body.exercise) {
            await Patient.updateOne({
                _id: patient_id
            }, {
                $push: {
                    exerciseTimestamp: {time: today, value: req.body.exercise, message: req.body.comment}
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