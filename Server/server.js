/* 
*   Backend of the web application
*/

// Backend webframerork
const express = require('express')

// import colors
const colors = require('colors')
// environment variables
const dotenv = require('dotenv').config()

// error handers
const {errorHandler} = require('./Middleware/errorMiddleware')

// import mongoDB function
const connectDB = require('./Config/db')

// server port
const port = process.env.PORT || 4000

// connect to database
connectDB()

// initialise express
const app = express()

//
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// routes
app.use('/api/portfolio', require('./Routes/portfolioRoutes'))
app.use('/api/users', require('./Routes/userRoutes'))

// error handlers
app.use(errorHandler)

app.listen(port, () => console.log(`Server running on port ${port}`))