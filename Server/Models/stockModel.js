//import mongoose
const { Double } = require('bson')
const mongoose = require('mongoose')
const { intersects } = require('semver')
const { float } = require('webidl-conversions')
const { double } = require('webidl-conversions')
const { long } = require('webidl-conversions')

// schema
const stockSchema = mongoose.Schema({
        symbol: {
            type: String,
            required: [true, 'Input a valid stock ticker symbol'],
        },
        date_bought: {
            type: Date,
            required: [true, 'input a valid date of purchase'],
        },
        no_shares: {
            type: Number,
            required: [true, 'input a valid number of shares'],
        },
        price_bought_at: {
            type: Number,
            required: [true, 'input a valid price of each share at time of purchase'],
        },
        notes: {
            type: String,
        },
    }, 
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Stock', stockSchema)