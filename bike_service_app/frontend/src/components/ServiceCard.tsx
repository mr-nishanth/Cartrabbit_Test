import React from 'react';

import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import useServiceStore from '../store/useServiceStore';

type ServiceCardProps = {
    service: Service;
};

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
    const navigate = useNavigate();
    const deleteService = useServiceStore((state) => state.deleteService);
    const [user] = useAuthStore((state) => [state.user]);

    const handleDeleteService = async () => {
        toast.loading('Deleting Service... ⌛', { id: '1' });
        const result = await deleteService(service?._id);
        if (result.success) {
            toast.success('Service deletion successfully 🚀', { id: '1' });
        } else {
            toast.error('Error in  Service deletion 🥲', {
                id: '1',
            });
        }
    };

    const handleServiceEdit = () => {
        return navigate(`/dashboard/edit/${service?._id}`);
    };

    const handleServiceDetails = () => {
        return navigate(`/dashboard/service-details/${service?._id}`);
    };
    return (
        <div className='w-[300px] rounded-md border mt-1 shadow-lg hover:bg-slate-200'>
            {/* <img
                src={room?.photos}
                className='h-[200px] w-full rounded-md object-cover'
            /> */}
            <div className='p-4'>
                <div className='m-1 text-sm text-gray-600 flex flex-col space-y-4 items-center justify-between w-full flex-wrap'>
                    <h1 className='text-lg font-semibold'>{service?.name}</h1>
                    {user?.role === 'customer' && (
                        <div className='border border-gray-700 bg-slate-700 text-white rounded-md p-1'>
                            <span>Owner : </span>
                            <span>
                                {service?.ownerId?.name?.toLocaleUpperCase()}
                            </span>
                        </div>
                    )}
                    <div className=''>
                        <p>Description : </p>
                        <p>{service?.description}</p>
                    </div>
                    <div>
                        <span>Service Price : </span>
                        <span>Rs {service?.price}</span>
                    </div>
                </div>
                <div className='flex items-center justify-between'>
                    {user?.role === 'owner' ? (
                        <>
                            <button
                                type='button'
                                className='mt-2 rounded-md bg-blue-400 px-2.5 py-1 text-base font-semibold text-white shadow-sm hover:bg-blue-500/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'
                                onClick={handleServiceEdit}
                            >
                                Edit
                            </button>
                            <button
                                onClick={handleDeleteService}
                                type='button'
                                className='mt-2 rounded-md bg-red-400 px-2.5 py-1 text-base font-semibold text-white shadow-sm hover:bg-red-500/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'
                            >
                                Delete
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                type='button'
                                className='mt-2 mx-auto rounded-md bg-blue-400 px-2.5 py-1 text-base font-semibold text-white shadow-sm hover:bg-blue-500/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'
                                onClick={handleServiceDetails}
                            >
                                View Details
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;
