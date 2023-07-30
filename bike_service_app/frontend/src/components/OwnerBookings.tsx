import { useEffect } from 'react';

import { shallow } from 'zustand/shallow';
import useBookingStore from '../store/useBookingStore';
import BookingCard from './BookingCard';

const OwnerBookings = () => {
    const [getAllBookingsForOwner, bookings] = useBookingStore(
        (state) => [state.getAllBookingsForOwner, state.bookings],
        shallow
    );
    useEffect(() => {
        getAllBookingsForOwner();
    }, [getAllBookingsForOwner]);

    return (
        <div className='w-full flex items-center justify-around flex-wrap space-x-3 space-y-3'>
            {bookings?.length ? (
                bookings?.map((booking) => {
                    console.log({ booking });

                    return (
                        <BookingCard
                            booking={booking}
                            key={booking?._id}
                        />
                    );
                })
            ) : (
                <div className='text-center p-10'>
                    <p>Whoops! No Booking History</p>
                </div>
            )}
        </div>
    );
};

export default OwnerBookings;
