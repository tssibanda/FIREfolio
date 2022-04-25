/* 
*   all the functions that handle the different CRUD API calls for the users.
*/

// import json web token
const jwt = require('jsonwebtoken')
// import bcrypt to encrypt password
const bcrypt = require('bcryptjs')
// import express async handler for the database
const asyncHandler = require('express-async-handler')

// import user schema
const User = require('../Models/userModel')
const { use } = require('express/lib/application')

/***************************** 
    Descriptioon:   add user
    Route:          POST /api/users
    Access:         public
*****************************/
const registerUser = asyncHandler(async (req, res) => {
    const {fullname, email, password, dob, address} = req.body

    // check if required fields are not empty
    if(!fullname || !email || !password){
        res.status(400)
        throw new Error('Please add all required fields')
    }

    // check if user already exists
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User with this email already exists')
    }

    // encrypt password using bcrypt
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    // register user
    const user = await User.create({
        fullname,
        email,
        password: hashedPassword,
        dob,
        address,
    })

    if(user){
        console.log(user)
        res.status(201).json({
            _id: user.id,
            fullname: user.fullname,
            email: user.email,
            dob: user.dob,
            address: user.address,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid User data')
    }
})

/***************************** 
    Descriptioon:   Authenticate user
    Route:          POST /api/users/login
    Access:         public
*****************************/
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    // get user by email
    const user = await User.findOne({email})

    // chack password
    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            fullname: user.fullname,
            email: user.email,
            dob: user.dob,
            address: user.address,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid email or password')
    }
})

/***************************** 
    Descriptioon:   Get User Account
    Route:          GET /api/users/myaccount
    Access:         private
*****************************/
const getAccount = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})

// Function to generate Json Web Token
const generateToken = (id) => {
    return jwt.sign(
        { id }, 
        process.env.JWT_SECRET, 
        {expiresIn: '30d',}
    )
}



module.exports = {
    registerUser, loginUser, getAccount
}