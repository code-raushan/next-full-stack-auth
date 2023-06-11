const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is a required field"],
        maxLength: [60, "Name must be less than 60 characters"],
    },
    email: {
        type: String,
        required: [true, "Email is a required field"],
        maxLength: [60, "Email cannot be greater than 60 characters"]
    },
    password: {
        type: String,
        minLength: [8, "Password cannot be less than 8 characters"]
    }
})
module.exports = mongoose.model('User', userSchema)
