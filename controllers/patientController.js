const mongoose = require('mongoose')
const Patient = require('../models/patient')
const Clinician = require('../models/clinician')
//const { off } = require('../models/patient')

// Pat
const my_patient_id = mongoose.Types.ObjectId("62713910a76e24742ae2aa9d")
// prolly more suited for clinician but eh testing
const getAllPatientData = async (req, res, next) => {
    try {
        const patients = await Patient.find().lean()
        return res.render('allPatients', {data: patients, layout: 'patient_main' })
    } catch (err) {
        return next(err)
    }   
}

const getAboutDiabetes = (req, res, next) => {
    try{
        res.render('aboutDiabetes', {layout: 'patient_main'})
    } catch (err) {
        next(err)
    }
}

const getAboutWebsite = (req, res, next) => {
    try{
        res.render('aboutWebsite', {layout: 'patient_main'})
    } catch (err) {
        next(err)
    }
}

const getDataByPatient = async (req, res, next) => { 
    try{
        const patient = await Patient.findById(my_patient_id).lean()
        return res.render('patientData', {oneItem: patient, layout: 'patient_main'})
    } catch (err) {
        return next(err)
    }

    /* (Hoang) Just switching to different database
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
    }*/
}

const logInPage = async (req, res, next) => {
    try {
        return res.render('signInPage', { layout: 'main' })
    } catch (err) {
        return next(err)
    }   
}
const logIn = async (req, res, next) => {
    try {
        return res.redirect("/patient/home")
    } catch (err) {
        return next(err)
    }
}

const getHomePage = async (req, res, next) => {
    try {
        return res.render('patientHome', { layout: 'patient_main' })
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
        const patient = await Patient.findById(my_patient_id).lean()
        
        if (patient.glucoseTimestamp) {
            //show time as DD/MM/YYYY, HH:MM:SS
            patient.glucoseTimestamp.forEach((element) => {
                element.time = element.time.toLocaleString()
            })
            //reverse timestamp so it show newest timestamp on top 
            //TODO: might want to change push timestamp to begin of list instead so don't need this
            patient.glucoseTimestamp = patient.glucoseTimestamp.reverse()
        }
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

        var submit = false
        var date_result = await Patient.findOne({
            _id: my_patient_id,
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

        // my attempt at making the submit ticks appear individually
        // for now we're just using glucose for d2
        //const attributes = ['glucose', 'weight', 'insulin', 'exercise']
        /*
        var date_result = {}
        date_result[0] = await PatientClinician.findOne({
            _id: my_patient_id,
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
        date_result[1] = await PatientClinician.findOne({
            _id: my_patient_id,
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
        date_result[2] = await PatientClinician.findOne({
            _id: my_patient_id,
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
        date_result[3] = await PatientClinician.findOne({
            _id: my_patient_id,
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

        for (result of date_result) {

        }

        */

        var patient_data = await Patient.findOne({_id: my_patient_id}).lean()
        if (date_result) {
            submit = true
        }
        
        if (patient_data.glucoseTimestamp.length) {
            //show time as DD/MM/YYYY, HH:MM:SS
            patient_data.glucoseTimestamp[patient_data.glucoseTimestamp.length-1].time = patient_data.glucoseTimestamp[patient_data.glucoseTimestamp.length-1].time.toLocaleString()
        }

        return res.render('recordHealth', { submitted: submit, patient: patient_data, layout: 'patient_main' })
    } catch (err) {
        return next(err)
    }
}

const insertGlucose = async (req, res, next) => {
    try {
        const today = new Date()
        const glucoseTimestamp = mongoose.Types.ObjectId()
        await Patient.updateOne({
            _id: my_patient_id
        }, {
            $push: {
                glucoseTimestamp: {time: today, value: req.body.glucose, message: req.body.comment}
            }
        })
        return res.redirect('/patient/record-health-form')
    } catch (err) {
        return next(err)
    }
}

const insertWeight = async (req, res, next) => {
    try {
        const today = new Date()
        const weightTimestamp = mongoose.Types.ObjectId()
        await Patient.updateOne({
            _id: my_patient_id
        }, {
            $push: {
                weightTimestamp: {time: today, value: req.body.weight, message: req.body.comment}
            }
        })
        return res.redirect('/patient/record-health-form')
    } catch (err) {
        return next(err)
    }
}

const insertInsulin = async (req, res, next) => {
    try {
        const today = new Date()
        const insulinTimestamp = mongoose.Types.ObjectId()
        await Patient.updateOne({
            _id: my_patient_id
        }, {
            $push: {
                insulinTimestamp: {time: today, value: req.body.insulin, message: req.body.comment}
            }
        })
        return res.redirect('/patient/record-health-form')
    } catch (err) {
        return next(err)
    }
}

const insertExercise = async (req, res, next) => {
    try {
        const today = new Date()
        const exerciseTimestamp = mongoose.Types.ObjectId()
        await Patient.updateOne({
            _id: my_patient_id
        }, {
            $push: {
                exerciseTimestamp: {time: today, value: req.body.exercise, message: req.body.comment}
            }
        })
        return res.redirect('/patient/record-health-form')
    } catch (err) {
        return next(err)
    }
}

module.exports = {
    getAllPatientData,
    getDataByPatient,
    getAboutDiabetes,
    getAboutWebsite,
    logInPage,
    logIn,
    getHomePage,
    getPersonal,
    getPastHealth,
    getRecordDataForm,
    insertGlucose,
    insertWeight,
    insertInsulin,
    insertExercise,
}
