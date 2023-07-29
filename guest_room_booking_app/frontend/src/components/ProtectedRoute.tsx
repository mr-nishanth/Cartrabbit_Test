import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import React from 'react';

type Props = {
    children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const location = useLocation().pathname;

    return isAuthenticated ? (
        <>{children}</>
    ) : (
        <Navigate
            to={`/login`}
            state={{ from: location }}
            replace
        />
    );
};
export default ProtectedRoute;
