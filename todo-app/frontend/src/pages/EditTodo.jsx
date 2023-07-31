import { useEffect, useState } from 'react';
import useTodoStore from '../store/useTodoStore';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const EditTodo = () => {
    const navigate = useNavigate();
    const [name, setName] = useState(undefined);
    const { id } = useParams();
    const [updateTodo, getTodo] = useTodoStore((state) => [
        state.updateTodo,
        state.getTodo,
    ]);

    const handleTodoChange = (e) => {
        setName(e.target.value);
    };

    useEffect(() => {
        const getTodoData = async () => {
            const result = await getTodo(id);
            if (result?.success) {
                setName(result?.todo?.name);
            }
        };
        getTodoData();
    }, [id, getTodo]);

    const handleEditTodo = async () => {
        console.log('Edit Todo');
        toast.loading('Editing Todo...', { id: '1' });
        console.log({ name });
        const result = await updateTodo(id, name);
        if (result?.success) {
            const message = result?.message ?? 'Todo Edited successfully 🚀';
            toast.success(message, { id: '1' });
            navigate('/');
        } else {
            let message;
            if (!result?.message) {
                message = result;
            } else {
                message = result?.message ?? 'Error occurs in Todo Editing 🥲';
            }

            toast.error(message, {
                id: '1',
            });
        }
    };

    return (
        <div>
            <h1>EditTodo</h1>
            <input
                type='text'
                value={name}
                onChange={handleTodoChange}
            />
            <button
                type='submit'
                onClick={handleEditTodo}
            >
                Edit Todo
            </button>
        </div>
    );
};

export default EditTodo;
