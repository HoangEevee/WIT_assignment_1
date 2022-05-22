const mongoose = require('mongoose')
const Patient = require('../models/patient')
const Clinician = require('../models/clinician')
const Account = require('../models/account')
const helpers = require('../utils/helper')

const getAchievement = async (req, res, next) => { 
    try{
        const patient_id = req.user.data_id
        const patient = await Patient.findById(patient_id).lean()
        engagement = helpers.calculateEngagement(patient)
        return res.render('achievement', {engagement: engagement, layout: 'patient_main', theme:req.user.theme})
    } catch (err) {
        return next(err)
    }
}

const getDigitalBadge = async (req, res, next) => { 
    try{
        const patient_id = req.user.data_id
        const patient = await Patient.findById(patient_id).lean()
        engagement = helpers.calculateEngagement(patient)
        return res.render('digitalBadge', {engagement: engagement, layout: 'patient_main', theme:req.user.theme})
    } catch (err) {
        return next(err)
    }
}

const getleaderboard = async (req, res, next) => { 
    try{
        const patients = await Patient.find().lean()
        const dates = []
        var i = 0
        for (var patient of patients) {
            const user = await Account.findOne({
                data_id: patient._id
            }, {
                username: 1
            }).lean()

            engagement = helpers.calculateEngagement(patient)

            if (engagement) {
                dates[i++] = {
                    username: user.username,
                    engagement: engagement,
                }
            } else {
                dates[i++] = {
                    username: user.username,
                    engagement: 0,
                }
            }
        }

        ranks = dates.sort(function(a, b){return b.engagement-a.engagement}).slice(0, 5)

        return res.render('leaderboard', {data: ranks, layout: 'patient_main', theme:req.user.theme})
    } catch (err) {
        return next(err)
    }
}
module.exports = {
    getAchievement,
    getDigitalBadge, 
    getleaderboard
    
}