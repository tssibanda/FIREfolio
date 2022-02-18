/* 
Backend of the web application
*/

// Backend webframerork
const express = require('express')

// environment variables
const dotenv = require('dotenv').config()

// error handers
const {errorHandler} = require('./Middleware/errorMiddleware')

// server port
const port = process.env.PORT || 4000

// initialise express
const app = express()

//
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// routes
app.use('/api/portfolio', require('./Routes/portfolioRoutes'))

// error handlers
app.use(errorHandler)

app.listen(port, () => console.log(`Server running on port ${port}`))