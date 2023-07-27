import { toast } from 'react-hot-toast';
import useAuthStore from '../store/useAuthStore';

const UserList = (user: User) => {
    const [deleteUser] = useAuthStore((state) => [state.deleteUser]);
    const handleDeleteUser = async () => {
        toast.loading('Deleting User... ⌛', { id: '1' });

        const result = await deleteUser(user?._id);
        if (result.success) {
            toast.success('User deletion successfully 🚀', { id: '1' });
        } else {
            toast.error('Error in while deleting user 🥲', {
                id: '1',
            });
        }
    };
    return (
        <div className='m-5 max-w-sm bg-white rounded-lg shadow-lg'>
            <div className='p-4'>
                <p className='text-xl font-bold'>Name : {user?.name}</p>
                <p className='text-gray-600'>Mobile: {user?.mobile}</p>
                <p className='text-gray-600'>Email: {user?.email}</p>
            </div>
            <div className='px-4 py-2 bg-gray-100'>
                <button
                    onClick={handleDeleteUser}
                    className='px-2 py-1 bg-red-500 text-white rounded'
                    disabled={user?.role === 'admin' ? true : false}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default UserList;
