// express async handler for the database
const asyncHandler = require('express-async-handler')
const request = require('request-promise')
const utils = require('../util/utils')

// import yahoo stocks
const yahooFinance = require('yahoo-finance2').default;

const combineObjects = (target,source) => {
    const newObject = target.slice(0, -1) +', '+ source.slice(1)
    return newObject
}

/***************************** 
    Descriptioon:   Get prediction
    Route:          POST /api
    Access:         Private
*****************************/
const getPrediction = asyncHandler(async (req,res)=>{

    // get stock Symbol Open, High, Low
    const quote = await yahooFinance.quote(req.body.symbol)

    // make a scoring request
    const symb = quote.symbol
    const Open = quote.regularMarketOpen
    const High = quote.regularMarketDayHigh
    const Low = quote.regularMarketDayLow
    const prevClose = quote.regularMarketPreviousClose

    const query = {
        "symbol":symb,
        "Open":Open,
        "High":High,
        "Low":Low
     }
     
    const pred = JSON.stringify(query)

    const scoring_options = {
        method:'POST',
        url: process.env.FIREFOLIO_API_URL,
        headers: {            
            'Content-Type':'application/json',
        },
        body: pred
    }

    try {
        
        const scoring_response = await request(scoring_options)
        const prev_close = JSON.stringify({"prev_close" : prevClose})
        const response = [combineObjects(scoring_response, prev_close)]
        res.status(200).json(JSON.parse(response))
    } catch (err) {
        console.log(err)
        res.send(err)
    }
})

module.exports = {
    getPrediction
}