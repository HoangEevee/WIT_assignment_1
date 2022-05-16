const mongoose = require('mongoose')
const Patient = require('../models/patient')
const Clinician = require('../models/clinician')

// Pat
const my_patient_id = mongoose.Types.ObjectId("62713910a76e24742ae2aa9d")

const getAchievement = async (req, res, next) => { 
    try{
        //const patient_id = req.user.data_id
        return res.render('achievement', {layout: 'patient_main'})
    } catch (err) {
        return next(err)
    }
}

const getDigitalBadge = async (req, res, next) => { 
    try{
        //const patient_id = req.user.data_id
        return res.render('digitalBadge', {layout: 'patient_main'})
    } catch (err) {
        return next(err)
    }
}

const getleaderboard = async (req, res, next) => { 
    try{
        const patients = await Patient.find().lean()
        console.log(patients)

        const today = new Date()

        const dates = Patient.aggregate(
            [
                {$project: {
                    _id: 0,
                    firstName: 1,
                    lastName: 1,
                    registeredDate: 1,
                    result: {
                        $dateSubtract: 
                    }
                }}
            ]
        )

        console.log(dates)

        return res.render('leaderboard', {data: patients, layout: 'patient_main'})
    } catch (err) {
        return next(err)
    }
}
module.exports = {
    getAchievement,
    getDigitalBadge, 
    getleaderboard
    
}