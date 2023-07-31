import { useState } from 'react';
import useTodoStore from '../store/useTodoStore';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddTodo = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');

    const addTodo = useTodoStore((state) => state.addTodo);

    const handleTodoChange = (e) => {
        setName(e.target.value);
    };

    const handleAddTodo = async () => {
        console.log('Add Todo');
        toast.loading('Adding Todo...', { id: '1' });
        console.log({ name });
        const result = await addTodo(name);
        if (result?.success) {
            const message = result?.message ?? 'Todo Added successfully 🚀';
            toast.success(message, { id: '1' });
            navigate('/');
        } else {
            let message;
            if (!result?.message) {
                message = result;
            } else {
                message = result?.message ?? 'Error occurs in Todo adding 🥲';
            }

            toast.error(message, {
                id: '1',
            });
        }
    };

    return (
        <div>
            <h1>AddTodo</h1>
            <input
                type='text'
                value={name}
                onChange={handleTodoChange}
            />
            <button
                type='submit'
                onClick={handleAddTodo}
            >
                Add Todo
            </button>
        </div>
    );
};

export default AddTodo;
