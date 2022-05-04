// import express
const express = require('express')

// import router
const router = express.Router()

//
const request = require('request-promise')

//
const {getPrediction} = require('../Controllers/wmlController')
// 
router.route('/').post(getPrediction)

module.exports = router