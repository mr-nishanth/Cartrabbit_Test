import { Home } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import useRoomStore from '../store/useRoomStore';
import { shallow } from 'zustand/shallow';
export function Navbar() {
    const navigate = useNavigate();
    const [isAuthenticated, logout, user] = useAuthStore(
        (state) => [state.isAuthenticated, state.logout, state.user],
        shallow
    );
    const [searchString, setSearchString] = useRoomStore(
        (state) => [state.searchString, state.setSearchString],
        shallow
    );
    const handleLogout = () => {
        logout();
        return navigate('/login');
    };
    return (
        <div className='relative w-full bg-slate-100  shadow-lg h-16'>
            <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8'>
                <Link to={'/'}>
                    <div className='inline-flex items-center space-x-2'>
                        <span>
                            <Home />
                        </span>
                        <span className='font-bold'>Home Zone</span>
                    </div>
                </Link>
                <div className='hidden space-x-2 lg:block'>
                    {isAuthenticated ? (
                        <div className='flex items-center  space-x-2'>
                            <form className='flex items-center space-x-6 bg-white rounded-md p-2 shadow-md w-64  md:flex-initial '>
                                <input
                                    type='text'
                                    placeholder='Browse Room'
                                    className='flex-1 outline-none p-1 ring-black '
                                    value={searchString}
                                    onChange={(e) =>
                                        setSearchString(e.target.value)
                                    }
                                />
                                <button
                                    type='submit'
                                    hidden
                                >
                                    Search
                                </button>
                            </form>
                            <Link
                                to={'/dashboard'}
                                className='rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'
                            >
                                Dashboard
                            </Link>
                            <h2 className='text-blue-600'>
                                {user?.name?.toUpperCase()}
                            </h2>
                            <button
                                type='button'
                                className='rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link to={'/sign-up'}>
                                <button
                                    type='button'
                                    className='rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'
                                >
                                    Sign Up
                                </button>
                            </Link>
                            <Link to={'/login'}>
                                <button
                                    type='button'
                                    className='rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'
                                >
                                    Log In
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
