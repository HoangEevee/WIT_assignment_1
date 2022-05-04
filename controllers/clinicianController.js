const mongoose = require('mongoose')
const Clinician = require('../models/clinician')
const Patient = require('../models/patient')

const my_clinician_id = mongoose.Types.ObjectId("62713547ab750c0e07f6387f")

// prolly more suited for clinician but eh testing
const getAllClinicianData = async (req, res, next) => {
    try {
        const clinicians = await Clinician.find().lean()
        return res.render('allPatients', {data: clinicians, layout: 'clinician_main' })
    } catch (err) {
        return next(err)
    }   
}

const logInPage = async (req, res, next) => {
    try {
        return res.render('signInPageClinician', { layout: 'main' })
    } catch (err) {
        return next(err)
    }   
}

const logIn = async (req, res, next) => {
    try {
        return res.redirect("./clinician/dashboard")
    } catch (err) {
        return next(err)
    }
}

const getAllPatientData = async (req, res, next) => {
    try {
        const ids = await Clinician.findById(my_clinician_id).lean()
        const patients = await Patient.find({ '_id': { $in: ids.patients } }).lean();
        //show time as DD/MM/YYYY, HH:MM:SS
        patients.forEach((element) => {
            if (element.glucoseTimestamp.length) {
                element.glucoseTimestamp[element.glucoseTimestamp.length-1].time = element.glucoseTimestamp[element.glucoseTimestamp.length-1].time.toLocaleString()
            }
        })
        return res.render('allPatients', {data: patients, layout: 'clinician_main'})
    } catch (err) {
        return next(err)
    }   
}

const getOnePatientData = async (req, res, next) => {
    try {
        const patient = await Patient.findById(req.params.id).lean()
        if (patient.glucoseTimestamp) {
            //show time as DD/MM/YYYY, HH:MM:SS
            patient.glucoseTimestamp.forEach((element) => {
                element.time = element.time.toLocaleString()
            })
            //reverse timestamp so it show newest on top 
            //TODO: might want to change push timestamp to begin of list instead so don't need this
            patient.glucoseTimestamp = patient.glucoseTimestamp.reverse() 
        }
        return res.render('onePatient', {data: patient, layout: 'clinician_main'})
        
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
        return res.render('createPatientAccount', {layout: 'clinician_main' })
    } catch (err) {
        return next(err)
    }
}


const createPatient = async (req, res, next) => {
    try {
        newPatient = new Patient( {...req.body, clinicianId: my_clinician_id} )
        await newPatient.save(function (err) {
            if (err) return console.error(err);
        })
        await Clinician.updateOne(
            {_id: my_clinician_id}, 
            {$push: {patients: newPatient}})
        return res.redirect('/clinician/create-patient-account')
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
        await Patient.updateOne({
            _id: req.params.id
        }, {
            $set: {
                "glucoseRecord": Boolean(req.body.glucose),
                "weightRecord": Boolean(req.body.weight),
                "insulinRecord": Boolean(req.body.insulin),
                "exerciseRecord": Boolean(req.body.exercise),
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

module.exports = {
    logInPage,
    logIn,
    getAllClinicianData,
    getAllPatientData,
    getOnePatientData,
    createAccountPage,
    createPatientPage,
    setTimeseriesPage,
    newTimeseries,
    setThreshold,
    createClinician,
    createPatient,
}