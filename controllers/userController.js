const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '1d' })
}

const signup = async (req, res, next) => {
  try {
    const { userName, password } = req.body

    if (!userName || !password) {
      return res.status(400).json({ error: 'All fields must be filled' })
    }

    const user = await User.signup(userName, password)

    res.status(201).json({
      status: 'success',
      data: { userName: user.userName },
      message: 'User created successfully',
    })
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const { userName, password } = req.body

    if (!userName || !password) {
      return res.status(400).json({ error: 'All fields must be filled' })
    }

    const user = await User.login(userName, password)

    // Creating a token
    const token = createToken(user._id)

    res.status(200).json({
      userName: user.userName,
      userId: user._id,
      token,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  signup,
  login,
}
