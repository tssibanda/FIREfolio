/* 
*   all the functions that handle the different CRUD API calls.
*/

// experiment 
const StockSocket = require('stocksocket')
const yahooStocks = require('yahoo-stock-prices')

// express async handler for the database
const asyncHandler = require('express-async-handler')

// import stock schema
const Stock = require('../Models/stockModel')

/***************************** 
    Descriptioon:   Get Portfolio
    Route:          GET /api/portfolio
    Access:         Private
*****************************/
const getPortfolio = asyncHandler(async (req, res) => {
    // get all stocks in DB
    const stocks = await Stock.find()
    // const symbols = stocks

    console.log(stocks)
    // // experiment Note: Stock Market only opens at 2:30pm dublin time 
    // const stockticker =  'AAPL'
    // const stockticker = stocks[0].symbol
    StockSocket.addTicker(stockticker, stockPriceChanged)
    function stockPriceChanged(data) {
        //Choose what to do with your data as it comes in.
        console.log(data)
        // StockSocket.removeTicker(stockticker)
    }

    res.status(200).json(stocks)
})

/***************************** 
    Descriptioon:   add to Portfolio
    Route:          POST /api/portfolio
    Access:         Private
*****************************/
const addStock = asyncHandler(async (req, res) => {
    if(!req.body.symbol){
        res.status(400)
        throw new Error('Enter a valid symbol/ ticker name')
    }

    // create new holding
    const stock = await Stock.create({
        symbol: req.body.symbol,
        date_bought: req.body.date_bought,
        no_shares: req.body.no_shares,
        price_bought_at: req.body.price_bought_at,
        notes: req.body.notes

    })

    res.status(200).json(stock)
})

/***************************** 
    Descriptioon:   Update Stock Holdings in Portfolio
    Route:          PUT /api/portfolio/:id
    Access:         Private
*****************************/
const updateStock = asyncHandler(async (req, res) => {
    // check if stock to be updated exists
    const stock = await Stock.findById(req.params.id)
    if(!stock){
        res.status(400)
        throw new Error('Stock not in portfolio')
    }

    const updatedStock = await Stock.findByIdAndUpdate(
        req.params.id, 
        req.body, {new: true})

    res.status(200).json(updatedStock)
})

/***************************** 
    Descriptioon:   Delete Stock Holdings in Portfolio
    Route:          DELETE /api/portfolio/:id
    Access:         Private
*****************************/
const deleteStock = asyncHandler(async (req, res) => {
    // check if stock to be deleted exists
    const stock = await Stock.findById(req.params.id)
    if(!stock){
        res.status(400)
        throw new Error('Stock not in portfolio')
    }

    await stock.remove()
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getPortfolio, addStock, updateStock, deleteStock,
}