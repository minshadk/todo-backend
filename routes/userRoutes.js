const express = require('express')

// controller functions
const { signup, login } = require('../controllers/userController')

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)

module.exports = router
