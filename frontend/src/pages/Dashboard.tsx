import useAuthStore from '../store/useAuthStore';
import Owner from '../components/Owner.js';
import Customer from '../components/Customer.js';

const Dashboard = () => {
    const [user] = useAuthStore((state) => [state.user]);
    console.log({ Role: user?.role });
    return (
        <div className='min-h-screen  w-full bg-slate-100 flex flex-col  items-center'>
            <div className='flex justify-center items-center  w-full h-full'>
                {user?.role === 'owner' ? <Owner /> : <Customer />}
            </div>
        </div>
    );
};

export default Dashboard;
