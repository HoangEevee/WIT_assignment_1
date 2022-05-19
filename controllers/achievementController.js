const mongoose = require('mongoose')
const Patient = require('../models/patient')
const Clinician = require('../models/clinician')
const Account = require('../models/account')
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
        const accounts = await Account.find().lean()

        const today = new Date()

        const dates = []
        var i = 0
        for (var patient of patients) {
            const start = patient.registeredDate
            const timestamp = patient.timestampedDates
            const user = await Account.find({
                data_id: patient._id
            }, {
                username: 1
            }).lean()
            if (timestamp.length) {
                diff = today - start
                to_days = Math.floor(diff / (24 * 60 * 60 * 1000))
                engagement = timestamp.length / to_days * 100
                dates[i++] = {
                    username: user[0].username,
                    engagement: engagement.toFixed(2),
                }
            } else {
                dates[i++] = {
                    username: user[0].username,
                    engagement: 0,
                }
            }
        }

        ranks = dates.sort(function(a, b){return b-a}).slice(0, 5)

        return res.render('leaderboard', {data: ranks, layout: 'patient_main'})
    } catch (err) {
        return next(err)
    }
}
module.exports = {
    getAchievement,
    getDigitalBadge, 
    getleaderboard
    
}