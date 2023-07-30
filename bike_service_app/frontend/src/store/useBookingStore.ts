import { create } from 'zustand';
import request from '../utils/axios_request';
import endpoints from '../utils/enpoints';

const initialState: BookingStore = {
    bookings: null,
};

interface BookingAction {
    getAllBookingsForOwner: () => Promise<Response>;
    getAllBookingsForCustomer: () => Promise<Response>;
    updateBookingStatus: (id: string, status: string) => Promise<Response>;

    serviceBooking: (serviceId: string, date: Date) => Promise<Response>;
}

const useBookingStore = create<BookingStore & BookingAction>()((set, get) => ({
    ...initialState,

    getAllBookingsForOwner: async () => {
        try {
            const { data } = await request.get(
                endpoints.getAllBookingByOwnerID
            );
            console.log({ GET_ALL_BOOKING_OWNER_RESPONSE: data });
            if (data.success) {
                set({
                    bookings: data?.bookings,
                });
                return data;
            }
        } catch (error: any) {
            console.error('Get all services failed:', error);
            console.log({ error });
            return error?.response?.data;
        }
    },
    getAllBookingsForCustomer: async () => {
        try {
            const { data } = await request.get(
                endpoints.getAllBookingByCustomerID
            );
            console.log({ GET_ALL_BOOKING_CUSTOMER_RESPONSE: data });
            if (data.success) {
                set({
                    bookings: data?.bookings,
                });
                return data;
            }
        } catch (error: any) {
            console.error('Get all services failed:', error);
            console.log({ error });
            return error?.response?.data;
        }
    },

    updateBookingStatus: async (id: string, status: string) => {
        try {
            const { data } = await request.patch(
                `${endpoints.updateBookingStatus}`,
                {
                    bookingId: id,
                    status,
                }
            );
            console.log({ UPDATE_BOOKING_STATUS_RESPONSE: data });
            if (data.success) {
                const oldBookings = get().bookings!;
                const newBookings = oldBookings?.map((booking) => {
                    if (booking._id === id) {
                        return data.booking;
                    }
                    return booking;
                });
                set({ bookings: newBookings });
                return data;
            }
        } catch (error: any) {
            console.error('Update Booking Status failed:', error);
            console.log({ error });
            return error?.response?.data;
        }
    },

    serviceBooking: async (serviceId: string, date: Date) => {
        try {
            const { data } = await request.post(endpoints.createBookings, {
                serviceId,
                date,
            });
            console.log({ CREATE_BOOKING_RESPONSE: data });
            if (data.success) {
                return data;
            }
        } catch (error: any) {
            console.error('Create Service failed:', error);
            console.log({ error });
            return error?.response?.data;
        }
    },
}));

export default useBookingStore;
