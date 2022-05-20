const mongoose = require('mongoose')
const Patient = require('../models/patient')
const Clinician = require('../models/clinician')
const helpers = require('../utils/helper')
const Account = require('../models/account')
const { redirect } = require('express/lib/response')

const getDataByPatient = async (req, res, next) => { 
    try{
        const patient_id = req.user.data_id
        const patient = await Patient.findById(patient_id).lean()
        const account = await Account.findOne({'data_id': patient_id}).lean()
        //get date to correct format YYYY-MM-DD
        patient.dob = patient.dob.toLocaleDateString('en-GB').split("/")
        patient.dob = patient.dob[2] + "-" + patient.dob[1] + "-" + patient.dob[0]
        return res.render('patientData', {patient: patient, account: account, layout: 'patient_main', flash:req.flash('error')})
    } catch (err) {
        return next(err)
    }
}

const changeAccountDetail = async (req, res, next) => {
    try {
        
        // Validations
        let flashMessage = "Stop messing with my HTML you donker. You have input"
        if (req.body.email && !helpers.isEmail(req.body.email)) flashMessage +=" invalid email"
        if (req.body.dob && !helpers.isDate(req.body.dob)) flashMessage += " invalid birthday"
        if (flashMessage !== "Stop messing with my HTML you donker. You have input") {
            req.flash("error", flashMessage)
            return res.redirect('./account-info')
        }

        // For changes in patient database
        if (req.body.firstName || req.body.lastName || req.body.dob || req.body.email) {
            let patient = await Patient.findOne({_id: req.user.data_id});

            if (req.body.firstName) patient["firstName"] = req.body.firstName;
            if (req.body.lastName) patient["lastName"] = req.body.lastName;
            if (req.body.dob) {
                date = req.body.dob.split("-")
                //HOLY FUCKING SHIT WHY WOULD JAVASCRIPT COUNT MONTH FROM 0-11. I LITERALLY WASTED SO MUCH TIME
                patient["dob"] = new Date(date[0], date[1]-1, date[2]);
            }
            if (req.body.email) patient["email"] = req.body.email;
            await patient.save();
        }

        // For changes in account database
        if (req.body.username || req.body.password) {
            const account_id = req.user._id;
            let user = await Account.findOne({_id: account_id});

            if (req.body.username) user["username"] = req.body.username;
            if (req.body.password) user["password"] = req.body.password;
            await user.save();
        }
        return res.redirect("./account-info")
    } catch(err) {
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
        helpers.changeTimestampDateFormat(patient.timeseries)
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
                    'lastUpdated.glucose': {time: today, value: req.body.glucose, message: req.body.comment},
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
                    'lastUpdated.weight': {time: today, value: req.body.weight, message: req.body.comment},
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
                    'lastUpdated.insulin': {time: today, value: req.body.insulin, message: req.body.comment},
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
                    'lastUpdated.exercise': {time: today, value: req.body.exercise, message: req.body.comment},
                }
            })
        }

        if (req.body.comment) {
            await Patient.updateOne({
                _id: patient_id,
            }, {
                $push: {
                    'lastComments': { 
                        "$each": [{time: today, message: req.body.comment}],
                        "$slice": -10
                    }
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
    changeAccountDetail,
    getPersonal,
    getPastHealth,
    getRecordDataForm,
    insertHealthData,
}