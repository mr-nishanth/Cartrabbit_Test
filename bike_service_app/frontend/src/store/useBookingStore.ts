import { create } from 'zustand';
import request from '../utils/axios_request';
import endpoints from '../utils/enpoints';

const initialState: BookingStore = {
    bookings: null,
    searchString: '',
};

interface BookingAction {
    setSearchString: (searchString: string) => void;
    getAllBookingsForOwner: () => Promise<Response>;

    updateBookingStatus: (id: string, status: string) => Promise<Response>;

    // addService: (
    //     name: string,
    //     description: string,
    //     price: string | number
    // ) => Promise<Response>;
    // updateService: (
    //     name: string,
    //     description: string,
    //     price: string | number,
    //     id: string
    // ) => Promise<Response>;
    // deleteService: (id: string) => Promise<Response>;

    // getServiceById: (id: string) => Promise<Response>;

    // getAllServicesForCustomer: () => Promise<Response>;
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

    // getAllServicesForCustomer: async () => {
    //     try {
    //         const { data } = await request.get(
    //             endpoints.getAllServicesForCustomer
    //         );
    //         console.log({ GET_ALL_SERVICES_RESPONSE: data });
    //         if (data.success) {
    //             set({
    //                 services: data?.service,
    //             });
    //             return data;
    //         }
    //     } catch (error: any) {
    //         console.error('Get all services failed:', error);
    //         console.log({ error });
    //         return error?.response?.data;
    //     }
    // },

    // getServiceById: async (id: string) => {
    //     try {
    //         const { data } = await request.get(
    //             `${endpoints.getServiceById}/${id}`
    //         );
    //         console.log({ GET_SERVICE_BY_ID_RESPONSE: data });
    //         if (data.success) {
    //             return data;
    //         }
    //     } catch (error: any) {
    //         console.error('Get service by id failed:', error);
    //         console.log({ error });
    //         return error?.response?.data;
    //     }
    // },

    // addService: async (
    //     name: string,
    //     description: string,
    //     price: string | number
    // ) => {
    //     try {
    //         const { data } = await request.post(endpoints.createService, {
    //             name,
    //             description,
    //             price,
    //         });
    //         console.log({ CREATE_ROOM_RESPONSE: data });
    //         if (data.success) {
    //             return data;
    //         }
    //     } catch (error: any) {
    //         console.error('Create Service failed:', error);
    //         console.log({ error });
    //         return error?.response?.data;
    //     }
    // },

    // updateService: async (
    //     name: string,
    //     description: string,
    //     price: string | number,
    //     id: string
    // ) => {
    //     try {
    //         const { data } = await request.patch(
    //             `${endpoints.updateServiceById}/${id}`,
    //             {
    //                 name,
    //                 description,
    //                 price,
    //             }
    //         );
    //         console.log({ UPDATE_SERVICES_RESPONSE: data });
    //         if (data.success) {
    //             const oldServices = get().services!;
    //             const newServices = oldServices?.map((service) => {
    //                 if (service._id === id) {
    //                     return data.service;
    //                 }
    //                 return service;
    //             });
    //             set({ services: newServices });
    //             return data;
    //         }
    //     } catch (error: any) {
    //         console.error('Update Service failed:', error);
    //         console.log({ error });
    //         return error?.response?.data;
    //     }
    // },

    // deleteService: async (id: string) => {
    //     try {
    //         const { data } = await request.delete(
    //             `${endpoints.deleteServiceById}/${id}`
    //         );
    //         console.log({ DELETE_RESPONSE: data });
    //         if (data.success) {
    //             let newService = get().services!;
    //             newService = newService?.filter(
    //                 (service) => service._id !== id
    //             );
    //             set((state) => ({ ...state, services: newService }));
    //             return data;
    //         }
    //     } catch (error: any) {
    //         console.error('Delete Services failed:', error);
    //         console.log({ error });
    //         return error?.response?.data;
    //     }
    // },

    setSearchString: (searchString) => set({ searchString }),
}));

export default useBookingStore;
