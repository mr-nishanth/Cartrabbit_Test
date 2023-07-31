const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Todo = require('../modal/Todo.modal');
const ErrorHandler = require('../utils/errorHandler');
const isValidMongoObjectId = require('../utils/isValidMongoObjectId');

/**
 * @description Create Todo
 * @path {/api/v1/todos}
 */

exports.createTodo = catchAsyncErrors(async (req, res, next) => {
    console.log('Todo', req.body);
    const { name } = req.body;

    if (!name) return next(new ErrorHandler('Please provide todo name', 429));

    const existingTodo = await Todo.findOne({ name });
    if (existingTodo) {
        return next(
            new ErrorHandler(
                `Already todo available for this name : ${name}`,
                400
            )
        );
    }

    const todo = await Todo.create({ name });
    if (!todo) {
        return next(new ErrorHandler('Error in todo creation', 500));
    }
    return res.status(201).json({
        message: 'Todo Create Successfully',
        success: true,
        todo,
    });
});

/**
 * @description Get All todos
 * @path {/api/v1/todos/all}
 */

exports.getAllTodos = catchAsyncErrors(async (req, res, next) => {
    const todos = await Todo.find().lean().exec();
    if (!todos) {
        return next(new ErrorHandler('No Todos available', 500));
    }
    return res.status(201).json({
        message: 'All Todos',
        success: true,
        todos,
    });
});

/**
 * @description Get a specific todo
 * @path {/api/v1/todos/:id}
 */

exports.getTodoById = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const isValidId = isValidMongoObjectId(id);
    if (!isValidId) {
        return next(new ErrorHandler('Invalid Todo Id', 400));
    }
    const todo = await Todo.findById(id).lean().exec();
    if (!todo) {
        return next(new ErrorHandler('No Todos available', 500));
    }
    return res.status(200).json({
        message: `Todo for ${id} ID`,
        success: true,
        todo,
    });
});

/**
 * @description Delete a specific todo
 * @path {/api/v1/todos/:id}
 */

exports.deleteTodoById = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const isValidId = isValidMongoObjectId(id);
    if (!isValidId) return next(new ErrorHandler('Invalid Todo Id', 400));

    const todo = await Todo.findByIdAndDelete(id).lean().exec();
    if (!todo)
        return next(new ErrorHandler('No Todos available or Not Found', 500));

    return res.status(200).json({
        message: ` Todo Deletion ID ${id}`,
        success: true,
        todo,
    });
});

/**
 * @description Update a specific todo
 * @path {/api/v1/todos/:id}
 */

exports.updateTodoById = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const isValidId = isValidMongoObjectId(id);
    if (!isValidId) return next(new ErrorHandler('Invalid Todo Id', 400));

    const { name } = req.body;
    if (!name) return next(new ErrorHandler('Please provide todo name', 429));

    const todo = await Todo.findByIdAndUpdate(
        id,
        { name: name },
        { new: true }
    ).exec();

    if (!todo)
        return next(new ErrorHandler('No Todos available or Not Found', 500));

    return res.status(200).json({
        message: ` Todo Updated ID ${id}`,
        success: true,
        todo,
    });
});

// deleteAllTodo

/**
 * @description Update a specific todo
 * @path {/api/v1/todos/delete-all}
 */
exports.deleteAllTodo = catchAsyncErrors(async (req, res, next) => {
    await Todo.deleteMany();

    return res.status(200).json({
        message: ` All Todo Deleted`,
        success: true,
    });
});

// console.log({ existingTodo });
// console.log(existingTodo?.name?.toLowerCase());
// console.log(name?.toLowerCase());

// if (existingTodo) {
//     if (existingTodo?.name?.toLowerCase() == name?.toLowerCase()) {
//         return next(
//             new ErrorHandler(
//                 `Already todo available for this name : ${name}`,
//                 400
//             )
//         );
//     }
// }
