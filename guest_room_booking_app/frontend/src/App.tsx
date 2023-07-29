import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import useAuthStore from './store/useAuthStore';
import { useEffect } from 'react';

const App = () => {
    const [isAuthenticated, getProfile] = useAuthStore((state) => [
        state.isAuthenticated,

        state.getProfile,
    ]);
    console.log({ isAuthenticated });

    useEffect(() => {
        getProfile();
    }, []);

    return <RouterProvider router={router} />;
};
export default App;
