import { create } from 'zustand';
import request from '../utils/axios_request';
import endpoints from '../utils/enpoints';

const initialState: AuthStore = {
    isAuthenticated: false,
    user: null,
    users: null,
};

interface AuthAction {
    register: (
        name: string,
        password: string,
        email: string,
        mobile: string,
        role: string
    ) => Promise<Response>;
    login: (email: string, password: string) => Promise<Response>;
    logout: () => Promise<boolean | undefined>;
    getProfile: () => Promise<User>;
}

const useAuthStore = create<AuthStore & AuthAction>()((set) => ({
    ...initialState,
    register: async (
        name: string,
        password: string,
        email: string,
        mobile: string,
        role: string
    ) => {
        try {
            const { data } = await request.post(endpoints.register, {
                name,
                password,
                email,
                mobile,
                role,
            });
            console.log({ REGISTER_RESPONSE: data });
            if (data.success) {
                set(() => ({
                    user: data?.userObj,
                }));
                return data;
            }
        } catch (error: any) {
            console.error('Registration failed:', error);
            console.log({ error });
            return error?.response?.data;
        }
    },

    login: async (email: string, password: string) => {
        try {
            const { data } = await request.post(endpoints.login, {
                email,
                password,
            });
            console.log({ LOGIN_RESPONSE: data });
            if (data.success) {
                set({
                    isAuthenticated: true,
                    user: data?.user,
                });
                return data;
            }
        } catch (error: any) {
            console.error('Login failed:', error);
            console.log({ error });
            return error?.response?.data;
        }
    },

    logout: async () => {
        try {
            const { data } = await request.get(endpoints.logout);
            console.log({ LOGOUT_RESPONSE: data });
            if (data.success) {
                set({ isAuthenticated: false, user: null });
                return true;
            }
        } catch (error: any) {
            console.error('Error While Logout', error);
            console.log({ error });
            return error?.response?.data;
        }
    },

    // USER
    getProfile: async () => {
        try {
            const { data } = await request.get(endpoints.getProfile);
            console.log({ PROFILE_RESPONSE: data });
            if (data.success) {
                set({
                    isAuthenticated: true,
                    user: data?.user,
                });
                return data;
            }
        } catch (error: any) {
            console.error('Get Profile failed:', error);
            console.log({ error });
            return error?.response?.data;
        }
    },
}));

export default useAuthStore;
