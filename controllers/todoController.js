const Todo = require('../models/todoModel')
const jwt = require('jsonwebtoken')

const createTodo = async (req, res, next) => {
  try {
    const createdBy = req.user._id
    const { title, description, dueDate, priority, status } = req.body
    console.log(req.body)
    console.log(title, description, dueDate, priority, status)
    if (!title || !description || !dueDate || !priority || !status) {
      return res.status(400).json({
        message: 'All fields must be filled',
      })
    }

    const todo = await Todo.create({
      title,
      description,
      dueDate,
      priority,
      status,
      createdBy,
    })

    return res.status(201).json({
      status: 'success',
      data: { todo },
      message: 'Todo created successfully',
    })
  } catch (error) {
    next(error)
  }
}

const getAllTodos = async (req, res, next) => {
  const userId = req.user._id

  try {
    const todos = await Todo.find({ createdBy: userId })
    return res.json(todos)
  } catch (error) {
    next(error)
  }
}

const getTodoById = async (req, res, next) => {
  const todoId = req.params.id

  try {
    const todo = await Todo.findById(todoId)
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' })
    }
    return res.json(todo)
  } catch (error) {
    next(error)
  }
}

const updateTodo = async (req, res, next) => {
  const todoId = req.params.id
  const updateData = req.body

  try {
    const todo = await Todo.findByIdAndUpdate(todoId, updateData, { new: true })
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' })
    }
    return res.json(todo)
  } catch (error) {
    next(error)
  }
}

const deleteTodo = async (req, res, next) => {
  const todoId = req.params.id

  try {
    const todo = await Todo.findByIdAndRemove(todoId)
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' })
    }
    return (
      res
        //   .status(202)
        .status(204)
        .json({ message: ' Todo deleted successfully' })
    )
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
}
