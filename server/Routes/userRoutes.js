const express = require('express')
const router = express.Router()
const { registerUser, getAccount, loginUser} = require('../Controllers/userController')
const { protectedRoutes } = require('../Middleware/authMiddleware')

// create user route
router.post('/', registerUser)
// log user in
router.post('/login', loginUser)
// get user account
router.get('/myaccount', protectedRoutes , getAccount)

module.exports = router