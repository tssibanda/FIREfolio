// express async handler for the database
const asyncHandler = require('express-async-handler')
const request = require('request-promise')
const utils = require('../util/utils')
const fields = utils.fields

// import yahoo stocks
const yahooFinance = require('yahoo-finance2').default;


/***************************** 
    Descriptioon:   Get Portfolio
    Route:          GET /api/stockanalyser
    Access:         Private
*****************************/
const getPrediction = asyncHandler(async (req,res)=>{
    // get access token from WML
    const options = {
        method:'POST',
        url: process.env.AUTH_URL,
        headers: {
            Accept: 'application/json',
            'Content-Type':'application/x-www-form-urlencoded'
        },
        form:{
            apikey: process.env.WML_API_KEY,
            grant_type: 'urn:ibm:params:oauth:grant-type:apikey'
        }
    }

    let response =''
    let access_token = ''

    try{
        response = await request(options)
        access_token = JSON.parse(response)['access_token']
    }catch(err){
        console.log(err)
        res.send(err)
    }

    // get stock Symbol Open, High, Low
    const quote = await yahooFinance.quote(req.body.symbol)

    // make a scoring request
    const Open = quote.regularMarketOpen
    const High = quote.regularMarketDayHigh
    const Low = quote.regularMarketDayLow
     
    pred = JSON.stringify({
        'input_data':[{fields: fields, values: [[ Open, High, Low ]]}]
    })    

    const scoring_options = {
        method:'POST',
        url: process.env.WML_SCORING_URL,
        headers: {            
            'Content-Type':'application/json',
            Authorization: `Bearer ${access_token}`,
            'ML-Instance-ID':process.env.FIREFOLIO_API_URL
        },
        body: pred
    }

    try {
        const scoring_response = await request(scoring_options)
        res.status(200).json(JSON.parse(scoring_response))
    } catch (err) {
        console.log(err)
        res.send(err)
    }
})

module.exports = {
    getPrediction
}