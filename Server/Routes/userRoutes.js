const express = require('express')
const router = express.Router()
const { registerUser, getAccount, loginUser} = require('../Controllers/userController')

// create user route
router.post('/', registerUser)
// log user in
router.post('/login', loginUser)
// get user account
router.get('/myaccount', getAccount)

module.exports = router