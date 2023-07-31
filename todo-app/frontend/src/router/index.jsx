import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import ErrorPage from '../pages/ErrorPage';
import AddTodo from '../pages/AddTodo';
import EditTodo from '../pages/EditTodo';

export const router = createBrowserRouter([
    {
        path: '/',
        id: 'Home',
        element: <Home />,

        errorElement: <ErrorPage />,
    },
    {
        path: '/add-todo',
        id: 'AddTodo',
        element: <AddTodo />,

        errorElement: <ErrorPage />,
    },
    {
        path: '/edit-todo/:id',
        id: 'EditTodo',
        element: <EditTodo />,

        errorElement: <ErrorPage />,
    },
]);
