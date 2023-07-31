import React, { memo, useEffect, useState } from 'react';
import useTodoStore from '../store/useTodoStore';
import { shallow } from 'zustand/shallow';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
const TodoList = () => {
    const [selectAllChecked, setSelectAllChecked] = useState(false);
    const [todos, deleteTodo, deleteAllTodos] = useTodoStore(
        (state) => [state.todos, state.deleteTodo, state.deleteAllTodos],
        shallow
    );
    const navigate = useNavigate();
    useEffect(() => {}, []);

    console.log({ todos });

    const handleEditTodo = (id) => {
        console.log('Edit Todo');
        navigate(`/edit-todo/${id}`);
    };

    const handleDeleteTodo = async (ids) => {
        toast.loading('Deleting Todo...', { id: '1' });

        const result = await deleteTodo(ids);
        if (result?.success) {
            const message = result?.message ?? 'Todo Deleted successfully 🚀';
            toast.success(message, { id: '1' });
            navigate('/');
        } else {
            let message;
            if (!result?.message) {
                message = result;
            } else {
                message = result?.message ?? 'Error occurs in Todo Deletion 🥲';
            }

            toast.error(message, {
                id: '1',
            });
        }
    };

    const handleToggleSelectAll = () => {
        console.log(selectAllChecked);
        setSelectAllChecked((prev) => !prev);
    };

    const handleDeleteAllTodo = async () => {
        console.log('Delete all Todo');

        toast.loading('Deleting all Todo...', { id: '1' });

        const result = await deleteAllTodos();
        if (result?.success) {
            const message =
                result?.message ?? 'All Todo Deleted successfully 🚀';
            toast.success(message, { id: '1' });
            navigate('/');
        } else {
            let message;
            if (!result?.message) {
                message = result;
            } else {
                message =
                    result?.message ?? 'Error occurs in All Todo Deletion 🥲';
            }

            toast.error(message, {
                id: '1',
            });
        }
    };

    let todoId = [];
    const handleCheck = (e) => {
        console.log(e.target.checked);

        if (e.target.checked) {
            todoId.push(e.target.value);
            console.log({ todoId });
        }

        // If the checkbox is not checked
        if (!e.target.checked) {
            todoId = todoId.filter((id) => id !== e.target.value);
            console.log({ todoId });
        }
    };

    return (
        <div>
            <h1>Todo List</h1>
            {/* Add checkbox for select all checkbox */}

            <br />

            <input
                type='checkbox'
                checked={selectAllChecked}
                onChange={handleToggleSelectAll}
            />
            <span>Select All Todos</span>
            {selectAllChecked ? (
                <button onClick={handleDeleteAllTodo}>Delete ALl Todos</button>
            ) : (
                // <button onClick={handleDeleteAllTodo}>Delete Checked</button>
                <></>
            )}
            <br />
            <br />
            <br />
            {todos.map((todo) => (
                <div key={todo._id}>
                    <input
                        type='checkbox'
                        name={todo?.name}
                        value={todo?._id}
                        onChange={handleCheck}
                        checked={selectAllChecked}
                        id={todo?.name}
                    />
                    <label htmlFor={todo?.name}>{todo.name}</label>
                    <button onClick={() => handleEditTodo(todo?._id)}>
                        Edit
                    </button>
                    <button onClick={() => handleDeleteTodo(todo?._id)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default memo(TodoList);
