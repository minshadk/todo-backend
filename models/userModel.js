const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    maxLength: 250,
  },
  password: {
    type: String,
    required: true,
    select: false,
    maxLength: 250,
  },
});

// Use Mongoose middleware to hash the password before saving
userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.statics.signup = async function (userName, password) {
  // Validation
  if (!userName || !password) {
    const error = new Error('All fields must be filled');
    error.status = 400;
    throw error;
  }

  const userExists = await this.findOne({ userName });
  if (userExists) {
    const error = new Error('User Name already in use');
    error.status = 400;
    throw error;
  }

  const user = await this.create({
    userName,
    password,
  });

  return user;
};

userSchema.statics.login = async function (userName, password) {
  // Validation
  if (!userName || !password) {
    const error = new Error('Invalid user credentials');
    error.status = 400;
    throw error;
  }

  const user = await this.findOne({ userName }).select('+password');
  if (!user) {
    const error = new Error('Invalid user credentials');
    error.status = 400;
    throw error;
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    const error = new Error('Invalid user credentials');
    error.status = 400;
    throw error;
  }

  return user;
};

module.exports = mongoose.model('User', userSchema);
