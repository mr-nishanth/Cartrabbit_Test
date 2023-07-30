import React, { useState } from 'react';

import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import useServiceStore from '../store/useServiceStore';
import useBookingStore from '../store/useBookingStore';

type BookingCardProps = {
    booking: Booking;
};

const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
    const [selectedStatus, setSelectedStatus] = useState(booking?.status || '');

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedStatus(e.target.value);
    };
    const navigate = useNavigate();
    const [updateBookingStatus] = useBookingStore((state) => [
        state.updateBookingStatus,
    ]);
    const [user] = useAuthStore((state) => [state.user]);

    const handleBookingStatus = async () => {
        console.log({ selectedStatus });
        toast.loading('Updating Booking Status... ⌛', { id: '1' });

        const result = await updateBookingStatus(booking?._id, selectedStatus);

        console.log({ UPDATE_BOOKING_STATUS: result });

        if (result?.success) {
            const message = result?.message ?? 'Status successfully updated 🚀';
            toast.success(message, { id: '1' });
        } else {
            let message;
            if (!result?.message) {
                message = result;
            } else {
                message =
                    result?.message ?? 'Error occurs in Status Updating 🥲';
            }
            toast.error(message, {
                id: '1',
            });
        }
    };

    const handleServiceDetails = () => {
        return navigate(`/dashboard/service-details/${booking?._id}`);
    };
    return (
        <div className='w-[400px] rounded-md border mt-1 shadow-lg hover:bg-slate-200'>
            <div className='p-4'>
                <div className='m-1 text-sm text-gray-600 flex flex-col space-y-2 items-start justify-between w-full flex-wrap'>
                    {user?.role === 'owner' ? (
                        <>
                            <h1 className='text-lg text-green-500 mx-auto'>
                                Booked Customer Details{' '}
                            </h1>
                            <div>
                                <span className='text-md font-semibold'>
                                    Name :
                                </span>
                                <span className='text-sm font-medium'>
                                    {' '}
                                    {booking?.customer?.name}
                                </span>
                            </div>
                            <div>
                                <span className='text-md font-semibold'>
                                    Email :
                                </span>
                                <span className='text-sm font-medium'>
                                    {' '}
                                    {booking?.customer?.email}
                                </span>
                            </div>
                            <div>
                                <span className='text-md font-semibold'>
                                    Mobile :
                                </span>
                                <span className='text-sm font-medium'>
                                    {' '}
                                    {booking?.customer?.mobile}
                                </span>
                            </div>
                            <div>
                                <span className='text-md font-semibold'>
                                    Booked Service :
                                </span>
                                <span className='text-sm font-medium'>
                                    {' '}
                                    {booking?.service?.name}
                                </span>
                            </div>
                            <div>
                                <span className='text-md font-semibold'>
                                    Service Booked Date :
                                </span>
                                <span className='text-sm font-medium'>
                                    {' '}
                                    {new Date(booking?.date).toDateString()}
                                </span>
                            </div>
                            <div>
                                <span className='text-md font-semibold'>
                                    Service Status :
                                </span>
                                <span className='text-sm font-medium'>
                                    {' '}
                                    {booking?.status}
                                </span>
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-base font-medium text-gray-900'>
                                    Update Status
                                </label>
                                <select
                                    value={selectedStatus}
                                    onChange={handleStatusChange}
                                    className='mt-1 flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'
                                >
                                    <option value=''>Pending</option>
                                    <option value='ReadyForDelivery'>
                                        Ready For Delivery
                                    </option>
                                    <option value='Completed'>Completed</option>
                                </select>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='border border-gray-700 bg-slate-700 text-white rounded-md p-1'>
                                <span>
                                    Owner Name : {booking?.customer?.name}{' '}
                                </span>
                            </div>
                            <div>
                                <span className='text-md font-semibold'>
                                    Service Name :
                                </span>
                                <span className='text-sm font-medium'>
                                    {booking?.service?.name}
                                </span>
                            </div>
                            <div>
                                <span className='text-md font-semibold'>
                                    Service Booked Date :
                                </span>
                                <span className='text-sm font-medium'>
                                    {' '}
                                    {new Date(booking?.date).toDateString()}
                                </span>
                            </div>
                            <div>
                                <span className='text-md font-semibold'>
                                    Service Status :{' '}
                                </span>
                                <span
                                    className={`text-sm font-medium ${
                                        booking?.status === 'Completed'
                                            ? 'text-green-600'
                                            : booking?.status ===
                                              'ReadyForDelivery'
                                            ? 'text-red-700'
                                            : 'text-blue-700'
                                    }`}
                                >
                                    {booking?.status}
                                </span>
                            </div>
                        </>
                    )}
                </div>
                <div className='flex items-center justify-between'>
                    {user?.role === 'owner' ? (
                        <>
                            <button
                                type='button'
                                className='mt-2 rounded-md bg-blue-400 px-2.5 py-1 text-base font-semibold text-white shadow-sm hover:bg-blue-500/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'
                                onClick={handleBookingStatus}
                            >
                                Update Status
                            </button>
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingCard;
