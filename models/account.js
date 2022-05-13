const mongoose = require('mongoose') 
const bcrypt = require('bcrypt')

const accountSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String},
    data_id: mongoose.Types.ObjectId,
})

// Password comparison function
// Compares the provided password with the stored password
// Allows us to call user.verifyPassword on any returned objects
accountSchema.methods.verifyPassword = function (password, callback) {
    bcrypt.compare(password, this.password, (err, valid) => {
        callback(err, valid)
    })
}

// Password salt factor
const SALT_FACTOR = 10

// Hash password before saving
accountSchema.pre('save', function save(next) {
    const user = this
    // Go to next if password field has not been modified
    if (!user.isModified('password')) {
        return next()
    }

    // Automatically generate salt, and calculate hash
    bcrypt.hash(user.password, SALT_FACTOR, (err, hash) => {
        if (err) {
            return next(err)
        }
        // Replace password with hash
        user.password = hash
        next()
    })
})
const Account = mongoose.model('Account', accountSchema) 
module.exports = Account