// import json web token
const jwt = require('jsonwebtoken')
// import express async handler
const asyncHandler = require('express-async-handler')
// import user model
const User = require('../Models/userModel')

const protectedRoutes = asyncHandler(async (req, res, next) => {
    let token

    //
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]

            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // get user from token
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('User is not Authorised!')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('User is not authorised, no token')
    }
})

module.exports = {
    protectedRoutes,
}