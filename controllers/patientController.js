const mongoose = require('mongoose')
const Patient = require('../models/patient')
const Clinician = require('../models/clinician')

// Pat
const my_patient_id = mongoose.Types.ObjectId("6262b744254dae87ed375139")

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

const logInPage = async (req, res, next) => {
    try {
        return res.render('signInPage', { layout: 'patient_main' })
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


const getRecordDataForm = async (req, res, next) => {
    try {
        //const patient = await Patient.findById(mongoose.Types.ObjectId('625f871de48eff0202cf9279')).lean()
        console.log(req.params)
        //console.log(document.getElementById('submitted'))
        return res.render('recordHealth', { submitted: false, layout: 'patient_main' })
    } catch (err) {
        return next(err)
    }
}

const insertGlucose = async (req, res, next) => {
    try {
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
        }
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
    homePage,
    getRecordDataForm,
    insertGlucose,
}
