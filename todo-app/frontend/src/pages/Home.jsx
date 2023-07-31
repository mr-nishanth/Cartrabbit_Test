import { useEffect, useState } from 'react';
import useTodoStore from '../store/useTodoStore';
import { shallow } from 'zustand/shallow';
import { useNavigate } from 'react-router-dom';
import TodoList from '../components/TodoList';

const Home = () => {
    const navigate = useNavigate();
    const [getTodos] = useTodoStore((state) => [state.getTodos], shallow);
    useEffect(() => {
        getTodos();
    }, [getTodos]);

    const handleAddTodo = () => {
        console.log('Add Todo');
        navigate('/add-todo');
    };

    return (
        <>
            <button onClick={handleAddTodo}>Add Todos</button>
            <TodoList />
        </>
    );
};

export default Home;
