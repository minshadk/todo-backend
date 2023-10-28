const express = require('express')
const cors = require('cors')

const app = express()

// import ErrorHandler from "./middlewares/ErrorHandler.js";
const ErrorHandler = require('./middlewares/ErrorHandler.js')

const userRoutes = require('./routes/userRoutes')
const todoRoutes = require('./routes/todoRoutes.js')

// middleware
app.use(cors())
app.use(express.json())

//Routes
app.use('/api/user', userRoutes)
app.use('/api/todo', todoRoutes)

app.use(ErrorHandler)
module.exports = app
