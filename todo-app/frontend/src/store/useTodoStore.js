import { create } from 'zustand';
import request from '../utils/axios_req';

const useTodoStore = create((set) => ({
    todos: [],

    addTodo: async (name) => {
        try {
            console.log({ name });
            const { data } = await request.post('/create', { name });
            console.log({ TODO_CREATE: data });
            if (data.success) {
                set((state) => ({ todos: [...state.todos, data?.todo] }));
                return data;
            }
        } catch (error) {
            console.error('TODO_CREATE failed:', error);
            console.log({ error });
            return error?.response?.data;
        }
    },

    getTodos: async () => {
        try {
            const { data } = await request.get('/all');
            console.log({ TODO_GET: data });
            if (data.success) {
                set({ todos: data.todos });
                return data;
            }
        } catch (error) {
            console.error('TODO_GET failed:', error);
            console.log({ error });
            return error?.response?.data;
        }
    },

    updateTodo: async (id, name) => {
        try {
            const { data } = await request.patch(`/${id}`, {
                name,
            });
            console.log({ TODO_UPDATE: data });
            if (data.success) {
                return data;
            }
        } catch (error) {
            console.error('TODO_UPDATE failed:', error);
            console.log({ error });
            return error?.response?.data;
        }
    },

    deleteTodo: async (id) => {
        try {
            const { data } = await request.delete(`/${id}`);
            console.log({ TODO_DELETE: data });
            if (data.success) {
                set((state) => ({
                    todos: state.todos.filter((t) => t._id !== id),
                }));
                return data;
            }
        } catch (error) {
            console.error('TODO_DELETE failed:', error);
            console.log({ error });
            return error?.response?.data;
        }
    },

    deleteAllTodos: async () => {
        try {
            const { data } = await request.delete('/delete-all');
            console.log({ TODO_DELETE_ALL: data });
            if (data.success) {
                set({ todos: [] });
                return data;
            }
        } catch (error) {
            console.error('TODO_DELETE_ALL failed:', error);
            console.log({ error });
            return error?.response?.data;
        }
    },

    getTodo: async (id) => {
        try {
            const { data } = await request.get(`/${id}`);
            console.log({ TODO_GET_ONE: data });
            if (data.success) {
                return data;
            }
        } catch (error) {
            console.error('TODO_GET_ONE failed:', error);
            console.log({ error });
            return error?.response?.data;
        }
    },
}));

export default useTodoStore;
