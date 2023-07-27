import { useEffect } from 'react';
import { SideBar } from '../components/SideBar';
import UserList from '../components/UserList.jsx';
import useAuthStore from '../store/useAuthStore';

const Dashboard = () => {
    const [user, getAllUser, users] = useAuthStore((state) => [
        state.user,
        state.getAllUser,
        state.users,
    ]);
    console.log({ Role: user?.role });
    useEffect(() => {
        getAllUser();
    }, []);
    return (
        <div className='h-[79vh] w-full bg-slate-100 flex  items-center'>
            <SideBar />
            <div>
                {user?.role === 'admin' ? (
                    <div className='space-3 p-3'>
                        <div className='flex flex-wrap items-center justify-evenly'>
                            {users?.map((user) => (
                                <UserList
                                    {...user}
                                    key={user._id}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <h1 className='p-56  text-3xl text-red-600'>
                        Sorry!, Dashboard only for admin.
                    </h1>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
