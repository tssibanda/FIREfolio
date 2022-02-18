// express async handler for the database
const asyncHandler = require('express-async-handler')


/***************************** 
    Descriptioon:   Get Portfolio
    Route:          GET /api/portfolio
    Access:         Private
*****************************/
const getPortfolio = asyncHandler(async (req, res) => {
    res.status(200).json({message : 'get portfolio'})
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
    res.status(200).json({message : 'add stock to portfolio'})
})

/***************************** 
    Descriptioon:   Update Stock Holdings in Portfolio
    Route:          PUT /api/portfolio/:id
    Access:         Private
*****************************/
const updateStock = asyncHandler(async (req, res) => {
    res.status(200).json({message : `update holdings for stock ${req.params.id}`})
})

/***************************** 
    Descriptioon:   Delete Stock Holdings in Portfolio
    Route:          DELETE /api/portfolio/:id
    Access:         Private
*****************************/
const deleteStock = asyncHandler(async (req, res) => {
    res.status(200).json({message : `delete holdings for stock ${req.params.id}`})
})

module.exports = {
    getPortfolio, addStock, updateStock, deleteStock,
}