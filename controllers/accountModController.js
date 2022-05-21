const Patient = require('../models/patient')
const Clinician = require('../models/clinician')
const helpers = require('../utils/helper')
const Account = require('../models/account')

const getAccountDetail = async (req, res, next) => { 
    try{
        const user_id = req.user.data_id
        let user;
        if (req.user.role == "clinician") {user = await Clinician.findById(user_id).lean()}
        else if (req.user.role == "patient") {user = await Patient.findById(user_id).lean()}
        const account = await Account.findOne({'data_id': user_id}).lean()
        //get date to correct format YYYY-MM-DD
        user.dob = user.dob.toLocaleDateString('en-GB').split("/")
        user.dob = user.dob[2] + "-" + user.dob[1] + "-" + user.dob[0]
        if (req.user.role === "clinician") {
            return res.render('userData', {patient: user, account: account, layout: 'clinician_main', theme: req.user.theme, flash:req.flash('error')})
        }
        else if (req.user.role === "patient") {
            return res.render('userData', {patient: user, account: account, layout: 'patient_main', theme: req.user.theme, flash:req.flash('error')})
        }
    } catch (err) {
        return next(err)
    }
}

const changeAccountDetail = async (req, res, next) => {
    try {
        console.log(req.body)
        // Validations
        let flashMessages = []
        const msgTemplate = "Stop messing with my HTML you donker. You have input "
        if (req.body.email && !helpers.isEmail(req.body.email)) flashMessages.push(msgTemplate + "invalid email")
        if (req.body.dob && !helpers.isDate(req.body.dob)) flashMessages.push(msgTemplate + "invalid birthday")
        if (req.body.theme && !["light","ugly"].includes(req.body.theme)) flashMessages.push(msgTemplate + "invalid theme")
        if (req.body.contactNumber && !Number.isInteger(parseFloat(req.body.contactNumber))) flashMessages.push(msgTemplate + "invalid phone number")
        if (await Account.findOne({'username': req.body.username}).lean()) flashMessages.push("Your new username has already been taken.")
        if (flashMessages.length !== 0) {
            req.flash("error", flashMessages)
            return res.redirect('./account-info')
        }

        // For changes in patient database
        if (req.body.firstName || req.body.lastName || req.body.dob || req.body.email || req.body.contactNumber) {
            let user;
            if (req.user.role === "clinician") user = await Clinician.findOne({_id: req.user.data_id});
            else if (req.user.role === "patient") user = await Patient.findOne({_id: req.user.data_id});

            if (req.body.firstName) user["firstName"] = req.body.firstName;
            if (req.body.lastName) user["lastName"] = req.body.lastName;
            if (req.body.dob) {
                date = req.body.dob.split("-")
                //HOLY FUCKING SHIT WHY WOULD JAVASCRIPT COUNT MONTH FROM 0-11. I LITERALLY WASTED SO MUCH TIME
                user["dob"] = new Date(date[0], date[1]-1, date[2]);
            }
            if (req.body.email) user["email"] = req.body.email;
            if (req.body.contactNumber) user["contactNumber"] = req.body.contactNumber;
            await user.save();
        }

        // For changes in account database
        if (req.body.username || req.body.password || req.body.theme) {
            let user = await Account.findOne({_id: req.user._id});

            if (req.body.username) user["username"] = req.body.username;
            if (req.body.password) user["password"] = req.body.password;
            if (req.body.theme) user["theme"] = req.body.theme;
            await user.save();
        }
        return res.redirect("./account-info")
    } catch(err) {
        return next(err)
    }
}

module.exports = {
    getAccountDetail,
    changeAccountDetail,
}