const mongoose = require('mongoose')
const Patient = require('../models/patient')
const Clinician = require('../models/clinician')
const PatientClinician = require("../models/patient-clinicians-test") //This is the database I'm (Hoang) using

// Pat
const my_patient_id = mongoose.Types.ObjectId("6262b744254dae87ed375139")
const new_my_patient_id = mongoose.Types.ObjectId("62654b66401a470ae8f67806")
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
    try{
        const patient = await PatientClinician.findById(new_my_patient_id).lean()
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
        return res.render('signInPage', { layout: 'patient_main' })
    } catch (err) {
        return next(err)
    }   
}
const logIn = async (req, res, next) => {
    try {
        return res.redirect("./patient/home")
    } catch (err) {
        return next(err)
    }
}

const homePage = async (req, res, next) => {
    try {
        return res.render('patientHome', { layout: 'patient_main' })
    } catch (err) {
        return next(err)
    }   
}

const getPastHealth = async(req, res, next) => {
    try {
        const patient = await PatientClinician.findById(new_my_patient_id).lean()
        
        //show time as DD/MM/YYYY, HH:MM:SS
        patient.timestamp.forEach((element) => {
            element.time = element.time.toLocaleString()
        })
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
        var date_result = await PatientClinician.findOne({
            _id: new_my_patient_id,
            timestamp: {
                $elemMatch: {
                    time: {
                        $gte: today_start,
                        $lt: tmr_start,
                    }
                }
            }
        },
        {
            'timestamp.$' : 1
        }).lean()

        var patient_data = await PatientClinician.findOne({_id: new_my_patient_id}).lean()
        if (date_result) {
            submit = true
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
        await PatientClinician.updateOne({
            _id: new_my_patient_id
        }, {
            $push: {
                timestamp: {time: today, glucose: req.body.glucose, message: req.body.comment}
            }
        })

        /*
        const today = new Date().toLocaleDateString()
        console.log(today)
        //console.log(Patient.findOne({_id: patient_id}, {health_data: {$elemMatch:{date: today}}}))
        const result = await Patient.findOne({_id: my_patient_id, health_data: {$elemMatch:{date: today}}}).lean()
        if (!result) {
            await Patient.updateOne({_id: my_patient_id}, {$push: {health_data : {date: today}}})
            console.log("pls stop going in")
        }
        // PUSH TO ARRAY WORKS BUT I CAN'T EDIT A NESTED OBJECT IN AN ARRAY WHAT AM I DOING WRONG
        var date_id = Patient.findOne({_id: my_patient_id, health_data: {$elemMatch:{date: today}}}).lean()
        var update = {
            value: req.body.glucose,
            comment: req.body.comment
        }
        await Patient.updateOne({_id: my_patient_id, health_data: {$elemMatch:{date: today}}}, {$push: {health_data : {glucose: update}}})
        if (req.body.comment_glucose) {
            await Patient.updateOne({_id: my_patient_id, health_data: {$elemMatch:{date: today}}},  { $set: { "health_data.$.glucose.comment": req.body.comment}},)
            console.log("in")
        }*/



        /*if (Patient.find({_id: my_patient_id, health_data: {$elemMatch:{date: today}}}, {})) {
            await Patient.updateOne({_id: my_patient_id}, {$push: {health_data : {date: today}}})
        }
        await Patient.updateOne({_id: my_patient_id, health_data: {$elemMatch:{date: today}}}, { $set: {'health_data.glucose.value': req.body.glucose}})
        if (req.body.comment_glucose) {
            await Patient.updateOne({_id: my_patient_id, health_data: {$elemMatch:{date: today}}},  { $set: {'health_data.glucose.comment': req.body.comment}})
        }*/
        /*
        await Patient.findOneAndUpdate(
            {_id: my_patient_id, health_data: {$elemMatch:{date: today}}},
            {$set: {health_data : { glucose: { value: req.body.glucose}}}},
            {upsert: true}
        );
        if (req.body.comment_glucose) {
            await Patient.findOneAndUpdate(
                {_id: my_patient_id, health_data: {$elemMatch:{date: today}}},
                {$set: {health_data : { glucose: { comment: req.body.comment}}}}
            )
        }*/
        //await Patient.save()
        return res.redirect('/patient/record-health-form')
    } catch (err) {
        return next(err)
    }
}

module.exports = {
    getAllPatientData,
    getDataByPatient,
    logInPage,
    logIn,
    homePage,
    getPastHealth,
    getRecordDataForm,
    insertGlucose,
}
