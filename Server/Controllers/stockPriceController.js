// express async handler for the database
const asyncHandler = require('express-async-handler')
// import yahoo stocks
const yahooFinance = require('yahoo-finance2').default;

/***************************** 
    Descriptioon:   Get stock price
    Route:          GET /api/price
    Access:         Private
*****************************/
const getStockPrice = asyncHandler(async (req, res) => {
    console.log(req.query)
    const quote = await yahooFinance.quote(req.query.symbol)
    res.status(200).send({
        symbol: quote.symbol,
        price: quote.regularMarketPrice, 
        currency: quote.currency,
    })
})

module.exports = {
    getStockPrice,
}