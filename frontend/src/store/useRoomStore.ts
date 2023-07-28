import { create } from 'zustand';
import request from '../utils/axios_request';
import endpoints from '../utils/enpoints';

const initialState: RoomStore = {
    rooms: null,
    room: null,
};

interface RoomAction {
    getAllRooms: () => Promise<Response>;
    getAllRoomsForCustomer: () => Promise<Response>;
    addRooms: (
        name: string,
        numBeds: string,
        minStay: string,
        maxStay: string,
        rentPerDay: string,
        image: File
    ) => Promise<Response>;
    deleteRoom: (id: string) => Promise<Response>;
    updateRoom: (
        name: string,
        numBeds: string,
        minStay: string,
        maxStay: string,
        rentPerDay: string,
        id: string
    ) => Promise<Response>;
    getRoomById: (id: string) => Promise<Response> | void;
    // getRoomById: (id: string) => void;
    roomBooing: (
        id: string,
        startDate: string,
        endDate: string
    ) => Promise<Response>;
}

const useRoomStore = create<RoomStore & RoomAction>()((set, get) => ({
    ...initialState,

    getAllRooms: async () => {
        try {
            const { data } = await request.get(endpoints.rooms);
            console.log({ GET_ALL_ROOM_RESPONSE: data });
            if (data.success) {
                set({
                    rooms: data?.rooms,
                });
                return data;
            }
        } catch (error: any) {
            console.error('Get all rooms failed:', error);
            console.log({ error });
            return error?.response?.data;
        }
    },
    getAllRoomsForCustomer: async () => {
        try {
            const { data } = await request.get(endpoints.roomsForCustomer);
            console.log({ GET_ALL_ROOM_RESPONSE: data });
            if (data.success) {
                set({
                    rooms: data?.rooms,
                });
                return data;
            }
        } catch (error: any) {
            console.error('Get all rooms failed:', error);
            console.log({ error });
            return error?.response?.data;
        }
    },
    addRooms: async (
        name: string,
        numBeds: string,
        minStay: string,
        maxStay: string,
        rentPerDay: string,
        image: File
    ) => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('numBeds', numBeds);
        formData.append('minStay', minStay);
        formData.append('maxStay', maxStay);
        formData.append('rentPerDay', rentPerDay);
        formData.append('image', image);

        try {
            const { data } = await request.post(endpoints.rooms, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log({ CREATE_ROOM_RESPONSE: data });
            if (data.success) {
                set({
                    rooms: data?.rooms,
                });
                return data;
            }
        } catch (error: any) {
            console.error('Create Room failed:', error);
            console.log({ error });
            return error?.response?.data;
        }
    },

    getRoomById: async (id: string) => {
        try {
            const { data } = await request.get(`${endpoints.rooms}/${id}`);
            console.log({ GET_ROOM_RESPONSE: data });
            if (data.success) {
                set({ room: data?.room });
                console.log(get().room);

                return data;
            }
        } catch (error: any) {
            console.error('Get all rooms failed:', error);
            console.log({ error });
            return error?.response?.data;
        }
    },

    updateRoom: async (
        name: string,
        numBeds: string,
        minStay: string,
        maxStay: string,
        rentPerDay: string,
        id: string
    ) => {
        try {
            const { data } = await request.put(`${endpoints.rooms}/${id}`, {
                name,
                numBeds,
                minStay,
                maxStay,
                rentPerDay,
            });
            console.log({ UPDATE_PROFILE_RESPONSE: data });
            if (data.success) {
                const oldRooms = get().rooms!;
                const newRooms = oldRooms?.map((room) => {
                    if (room._id === id) {
                        return data.room;
                    }
                    return room;
                });
                set({ rooms: newRooms });
                return data;
            }
        } catch (error: any) {
            console.error('Update Profile failed:', error);
            console.log({ error });
            return error?.response?.data;
        }
    },

    deleteRoom: async (id: string) => {
        try {
            const { data } = await request.delete(`${endpoints.rooms}/${id}`);
            console.log({ DELETE_RESPONSE: data });
            if (data.success) {
                let newRooms = get().rooms!;
                newRooms = newRooms?.filter((room) => room._id !== id);
                set((state) => ({ ...state, rooms: newRooms }));
                return data;
            }
        } catch (error: any) {
            console.error('Delete User failed:', error);
            console.log({ error });
            return error?.response?.data;
        }
    },

    roomBooing: async (id: string, startDate: string, endDate: string) => {
        try {
            const { data } = await request.post(`${endpoints.bookings}/${id}`, {
                startDate,
                endDate,
            });
            console.log({ BOOKING_RESPONSE: data });
            if (data.success) {
                return data;
            }
        } catch (error: any) {
            console.error('Booking failed:', error);
            console.log({ error });
            return error?.response?.data;
        }
    },
}));

export default useRoomStore;
