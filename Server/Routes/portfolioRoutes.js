const express = require('express')
const router = express.Router()
const { getPortfolio, addStock, updateStock, deleteStock, } = require('../Controllers/portfolioController')

// retrieve a stock portfolio and add new stock to portfolio routes
router.route('/').get(getPortfolio).post(addStock)

// Update a stock's holding in the portfolio and remove a stock from the portfolio routes
router.route('/:id').put(updateStock).delete(deleteStock)

module.exports = router