// import express
const express = require('express')

// import router
const router = express.Router()

// import stock price controller
const {getStockPrice} = require('../Controllers/stockPriceController')

// import route protector
const { protectedRoutes } = require('../Middleware/authMiddleware')

// router.get('/', getStockPrice)
router.route('/').get(getStockPrice)

module.exports = router