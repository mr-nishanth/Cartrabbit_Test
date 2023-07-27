import { lazy, Suspense } from 'react';

import { createBrowserRouter } from 'react-router-dom';

import ErrorPage from '../components/ErrorPage';
import ProtectedRoute from '../components/ProtectedRoute';

import BaseLayout from '../layouts/BaseLayout';

import LogIn from '../pages/LogIn';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';

const Dashboard = lazy(() => import('../pages/Dashboard'));

export const router = createBrowserRouter([
    {
        path: '/',
        id: 'Home',
        element: (
            <BaseLayout>
                <Home />
            </BaseLayout>
        ),

        errorElement: <ErrorPage />,
    },
    {
        path: '/sign-up',
        id: 'SignUp',
        element: (
            <BaseLayout>
                <SignUp />
            </BaseLayout>
        ),
        errorElement: <ErrorPage />,
    },
    {
        path: '/login',
        id: 'Login',
        element: (
            <BaseLayout>
                <LogIn />
            </BaseLayout>
        ),
        errorElement: <ErrorPage />,
    },
    {
        path: '/dashboard',
        id: 'dashboard',
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <BaseLayout>
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                </BaseLayout>
            </Suspense>
        ),
        errorElement: <ErrorPage />,
    },
]);
