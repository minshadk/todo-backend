const mongoose = require('mongoose')

const Schema = mongoose.Schema

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxLength: 250,
  },
  description: {
    type: String,
    required: true,
    maxLength: 700,
  },
  createdDate: {
    type: Date,
    required: true,
    // setting current date 
    default: Date.now,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  updatedDate: {
    type: Date,
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
  },
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Done'],
    default: 'To Do',
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

//  pre middleware for findOneAndUpdate to update 'updatedDate'
todoSchema.pre('findOneAndUpdate', function (next) {
  this._update.updatedDate = new Date()
  next()
})

todoSchema.statics.createTodo = async function (
  title,
  description,
  dueDate,
  priority,
  status,
  createdBy,
) {
  if (
    !title ||
    !description ||
    !dueDate ||
    !priority ||
    !status ||
    !createdBy
  ) {
    throw new Error('All required fields must be filled')
  }

  try {
    const todo = await this.create({
      title,
      description,
      dueDate,
      priority,
      status,
      createdBy,
    })

    return todo
  } catch (error) {
    throw error
  }
}

module.exports = mongoose.model('Todo', todoSchema)
