import { useEffect } from 'react';

import ServiceCard from './ServiceCard';
import { shallow } from 'zustand/shallow';
import { useNavigate } from 'react-router-dom';
import useServiceStore from '../store/useServiceStore';
const Owner = () => {
    const navigate = useNavigate();
    const [getAllServicesForOwner, services] = useServiceStore(
        (state) => [state.getAllServicesForOwner, state.services],
        shallow
    );
    useEffect(() => {
        getAllServicesForOwner();
    }, [getAllServicesForOwner]);

    const handleAddRoom = () => {
        navigate('/dashboard/add');
    };
    return (
        <div className='w-full flex items-center justify-around flex-wrap space-x-3 space-y-3'>
            <div className='flex bg-slate-600 w-full p-3'>
                <button
                    onClick={handleAddRoom}
                    className='px-2 py-1 bg-green-500 text-white rounded'
                >
                    Add Room
                </button>
            </div>
            {services?.length ? (
                services?.map((service) => {
                    return (
                        <ServiceCard
                            service={service}
                            key={service._id}
                        />
                    );
                })
            ) : (
                <div className='text-center p-10'>
                    <p>Please create your first service </p>
                </div>
            )}
        </div>
    );
};

export default Owner;
