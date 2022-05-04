// import mongoose
const mongoose = require('mongoose')

// schema
const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'Input your name'],
    },
    email: {
        type: String,
        required: [true, 'Please enter a valid email'],
        unique: true,
    },
    password:{
        type: String,
        required: [true, 'Please enter a strong password'],
    },
    dob: {
        type: Date,
    },
    address: {
        type: String,
    },
}, 
{
    timestamps: true,
})

module.exports = mongoose.model('User', userSchema)