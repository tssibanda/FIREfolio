/* 
*   Backend of the web application
*/

//
const path = require('path')
// import cors
const cors = require('cors')

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
app.use(cors())

// routes
app.use('/api/portfolio', require('./Routes/portfolioRoutes'))
app.use('/api/users', require('./Routes/userRoutes'))
app.use('/api/stockanalyser', require('./Routes/stockAnalyerRoutes'))

// serve frontend
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../client/build')))
    app.get('*', (req, res) => res.sendFile(
        path.resolve(__dirname, '../', 'client', 'build', 'index.html')
        )
    )
}else{
    app.get('/', (req,res) => res.send('Please set environment to production'))
}
// error handlers
app.use(errorHandler)

app.listen(port, () => console.log(`Server running on port ${port}`))