import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { Toaster } from 'react-hot-toast';

function App() {
    return (
        <>
            <RouterProvider router={router}></RouterProvider>
            <Toaster />
        </>
    );
}

export default App;
