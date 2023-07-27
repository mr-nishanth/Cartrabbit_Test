import { Toaster } from 'react-hot-toast';
import { Navbar } from '../components/Navbar';

type Props = {
    children: React.ReactNode;
};

const BaseLayout: React.FC<Props> = ({ children }) => {
    return (
        <div className='flex flex-col justify-between'>
            <Navbar />
            <main className='flex flex-1 justify-center items-center'>
                {children}
            </main>
            <Toaster />
        </div>
    );
};
export default BaseLayout;
