// import express
const express = require('express')

// import router
const router = express.Router()

// import portfollio controller
const { getPortfolio, addStock, updateStock, deleteStock, } = require('../Controllers/portfolioController')

// import 
const { protectedRoutes } = require('../Middleware/authMiddleware')

// retrieve a stock portfolio and add new stock to portfolio routes
router.route('/').get(protectedRoutes, getPortfolio).post(protectedRoutes, addStock)

// Update a stock's holding in the portfolio and remove a stock from the portfolio routes
router.route('/:id').put(protectedRoutes, updateStock).delete(protectedRoutes, deleteStock)

module.exports = router