import { create } from 'zustand';
import request from '../utils/axios_request';
import endpoints from '../utils/enpoints';

const initialState: ServiceStore = {
    services: null,
    searchString: '',
};

interface ServiceAction {
    setSearchString: (searchString: string) => void;
    getAllServicesForOwner: () => Promise<Response>;

    addService: (
        name: string,
        description: string,
        price: string | number
    ) => Promise<Response>;
    updateService: (
        name: string,
        description: string,
        price: string | number,
        id: string
    ) => Promise<Response>;
    deleteService: (id: string) => Promise<Response>;

    getServiceById: (id: string) => Promise<Response>;

    getAllServicesForCustomer: () => Promise<Response>;
}

const useServiceStore = create<ServiceStore & ServiceAction>()((set, get) => ({
    ...initialState,

    getAllServicesForOwner: async () => {
        try {
            const { data } = await request.get(
                endpoints.getAllServicesForOwner
            );
            console.log({ GET_ALL_SERVICES_RESPONSE: data });
            if (data.success) {
                set({
                    services: data?.services,
                });
                return data;
            }
        } catch (error: any) {
            console.error('Get all services failed:', error);
            console.log({ error });
            return error?.response?.data;
        }
    },
    getAllServicesForCustomer: async () => {
        try {
            const { data } = await request.get(
                endpoints.getAllServicesForCustomer
            );
            console.log({ GET_ALL_SERVICES_RESPONSE: data });
            if (data.success) {
                set({
                    services: data?.service,
                });
                return data;
            }
        } catch (error: any) {
            console.error('Get all services failed:', error);
            console.log({ error });
            return error?.response?.data;
        }
    },

    getServiceById: async (id: string) => {
        try {
            const { data } = await request.get(
                `${endpoints.getServiceById}/${id}`
            );
            console.log({ GET_SERVICE_BY_ID_RESPONSE: data });
            if (data.success) {
                return data;
            }
        } catch (error: any) {
            console.error('Get service by id failed:', error);
            console.log({ error });
            return error?.response?.data;
        }
    },

    addService: async (
        name: string,
        description: string,
        price: string | number
    ) => {
        try {
            const { data } = await request.post(endpoints.createService, {
                name,
                description,
                price,
            });
            console.log({ CREATE_ROOM_RESPONSE: data });
            if (data.success) {
                return data;
            }
        } catch (error: any) {
            console.error('Create Service failed:', error);
            console.log({ error });
            return error?.response?.data;
        }
    },

    updateService: async (
        name: string,
        description: string,
        price: string | number,
        id: string
    ) => {
        try {
            const { data } = await request.patch(
                `${endpoints.updateServiceById}/${id}`,
                {
                    name,
                    description,
                    price,
                }
            );
            console.log({ UPDATE_SERVICES_RESPONSE: data });
            if (data.success) {
                const oldServices = get().services!;
                const newServices = oldServices?.map((service) => {
                    if (service._id === id) {
                        return data.service;
                    }
                    return service;
                });
                set({ services: newServices });
                return data;
            }
        } catch (error: any) {
            console.error('Update Service failed:', error);
            console.log({ error });
            return error?.response?.data;
        }
    },

    deleteService: async (id: string) => {
        try {
            const { data } = await request.delete(
                `${endpoints.deleteServiceById}/${id}`
            );
            console.log({ DELETE_RESPONSE: data });
            if (data.success) {
                let newService = get().services!;
                newService = newService?.filter(
                    (service) => service._id !== id
                );
                set((state) => ({ ...state, services: newService }));
                return data;
            }
        } catch (error: any) {
            console.error('Delete Services failed:', error);
            console.log({ error });
            return error?.response?.data;
        }
    },

    setSearchString: (searchString) => set({ searchString }),
}));

export default useServiceStore;
