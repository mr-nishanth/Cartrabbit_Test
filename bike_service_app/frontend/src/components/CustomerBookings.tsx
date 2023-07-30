import { useEffect } from 'react';
import BookingCard from './BookingCard';
import { shallow } from 'zustand/shallow';
import useServiceStore from '../store/useServiceStore';
import useBookingStore from '../store/useBookingStore';

const CustomerBookings = () => {
    const [getAllBookingsForCustomer, bookings] = useBookingStore(
        (state) => [state.getAllBookingsForCustomer, state.bookings],
        shallow
    );
    useEffect(() => {
        getAllBookingsForCustomer();
    }, [getAllBookingsForCustomer]);

    return (
        <div className='w-full flex items-center justify-around flex-wrap space-x-3 space-y-3'>
            {bookings?.length ? (
                bookings?.map((booking) => {
                    console.log({ booking });
                    return (
                        <BookingCard
                            booking={booking}
                            key={booking._id}
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

export default CustomerBookings;
