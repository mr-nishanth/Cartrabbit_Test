import { BarChart, PersonStandingIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

export function SideBar() {
    const user = useAuthStore((state) => state.user);
    console.log({ user });
    return (
        <aside className='flex h-[80vh] w-64 flex-col overflow-y-auto border-r bg-white px-5 py-8'>
            <div className='mt-6 flex flex-1 flex-col justify-between'>
                <nav className='-mx-3 space-y-6 '>
                    <div className='space-y-3 '>
                        <label className='px-3 text-xs font-semibold uppercase text-gray-900'>
                            Settings
                        </label>
                        <Link
                            className='flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700'
                            to='/dashboard'
                        >
                            <BarChart
                                className='h-5 w-5'
                                aria-hidden='true'
                            />
                            <span className='mx-2 text-sm font-medium'>
                                Dashboard
                            </span>
                        </Link>

                        <Link
                            to={'/profile'}
                            className='flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700'
                        >
                            <PersonStandingIcon
                                className='h-5 w-5'
                                aria-hidden='true'
                            />
                            <span className='mx-2 text-sm font-medium'>
                                Profile
                            </span>
                        </Link>
                    </div>
                </nav>
                <div className='mt-6'>
                    {user?.name && (
                        <span className='text-sm font-medium text-gray-700'>
                            Username : {user.name} <br />
                            Email : {user.email}
                        </span>
                    )}
                </div>
            </div>
        </aside>
    );
}
