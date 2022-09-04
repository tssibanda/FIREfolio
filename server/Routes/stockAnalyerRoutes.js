// import express
const express = require('express')

// import router
const router = express.Router()

//
const request = require('request-promise')

// import route protector
const { protectedRoutes } = require('../Middleware/authMiddleware')

//
const {getPrediction} = require('../Controllers/stockAnalyserController')
// 
router.route('/').post(protectedRoutes, getPrediction)

module.exports = router