const express = require('express')

// controller functions
const {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
} = require('../controllers/todoController')

const requireAuth = require('../middlewares/requireAuth')

const router = express.Router()
router.use(requireAuth)
router.post('/createTodo', createTodo)
router.get('/', getAllTodos)
router.get('/:id', getTodoById)
router.patch('/:id', updateTodo)
router.delete('/:id', deleteTodo)

module.exports = router
