/* 
*   all the functions that handle the different CRUD API calls for the stocks.
*/

// express async handler for the database
const asyncHandler = require('express-async-handler')

// import stock schema
const Stock = require('../Models/stockModel')

// import user schema
const User = require('../Models/userModel')

/***************************** 
    Descriptioon:   Get Portfolio
    Route:          GET /api/portfolio
    Access:         Private
*****************************/
const getPortfolio = asyncHandler(async (req, res) => {
    // get all stocks in DB
    const stocks = await Stock.find({user: req.user.id})
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
        user: req.user.id,
        symbol: req.body.symbol,
        date_bought: req.body.date_bought,
        no_shares: req.body.no_shares,
        price_bought_at: req.body.price_bought_at,
        notes: req.body.notes,
        
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

    //check user exists
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    // check logged in user is updating their own stocks
    if(stock.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorised')
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

    //check user exists
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    // check logged in user is updating their own stocks
    if(stock.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorised')
    }

    await stock.remove()
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getPortfolio, addStock, updateStock, deleteStock,
}