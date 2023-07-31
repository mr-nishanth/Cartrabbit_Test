const {
    getAllTodos,
    createTodo,
    getTodoById,
    updateTodoById,
    deleteTodoById,
    deleteAllTodo,
} = require('../controllers/todos.controllers');

const router = require('express').Router();

// Get All Todos
router.get('/all', getAllTodos);

// Create Todo
router.post('/create', createTodo);

// Delete ALl Todo
router.delete('/delete-all', deleteAllTodo);

// Get Specifics Todo
router
    .route('/:id')
    .get(getTodoById)
    .patch(updateTodoById)
    .delete(deleteTodoById);

// Get All Todos

module.exports = router;
