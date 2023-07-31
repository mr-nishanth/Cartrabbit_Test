const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Todo Name is required'],
        },
    },
    { timestamps: true }
);

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;
