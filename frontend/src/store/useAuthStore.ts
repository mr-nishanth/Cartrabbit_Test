import { create } from 'zustand';
import request from '../utils/axios_request';
import endpoints from '../utils/enpoints';

// import { devtools, persist } from 'zustand/middleware';
// const myMiddlewares = (f) => devtools(persist(f));

const initialState: AuthStore = {
    isAuthenticated: false,
    user: null,
    users: null,
};

interface AuthAction {
    register: (
        username: string,
        password: string,
        email: string,
        mobile: string
    ) => Promise<Response>;
    login: (email: string, password: string) => Promise<Response>;
    logout: () => Promise<boolean | undefined>;
    getProfile: () => Promise<User>;
    updateProfile: (
        username: string,
        email: string,
        mobile: string
    ) => Promise<Response>;
    getAllUser: () => Promise<User[]>;
    deleteUser: (id: string) => Promise<Response>;
}

const useAuthStore = create<AuthStore & AuthAction>()((set, get) => ({
    ...initialState,
    register: async (
        username: string,
        password: string,
        email: string,
        mobile: string
    ) => {
        try {
            const { data } = await request.post(endpoints.register, {
                username,
                password,
                email,
                mobile,
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

                    user: data.userObj,
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

    updateProfile: async (username: string, email: string, mobile: string) => {
        try {
            const { data } = await request.put(endpoints.updateProfile, {
                name: username,
                email,
                mobile,
            });
            console.log({ UPDATE_PROFILE_RESPONSE: data });
            if (data.success) {
                set({
                    user: data?.user,
                });
                return data;
            }
        } catch (error: any) {
            console.error('Update Profile failed:', error);
            console.log({ error });
            return error?.response?.data;
        }
    },

    // Admin
    getAllUser: async () => {
        try {
            const { data } = await request.get(endpoints.getAllUser);
            console.log({ GET_ALL_USER_RESPONSE: data });
            if (data.success) {
                set({
                    users: data?.users,
                });
                return data;
            }
        } catch (error: any) {
            console.error('Get all User failed:', error);
            console.log({ error });
            return error?.response?.data;
        }
    },

    deleteUser: async (id: string) => {
        try {
            const { data } = await request.delete(
                `${endpoints.deleteUser}/${id}`
            );
            console.log({ DELETE_RESPONSE: data });
            if (data.success) {
                let newUsers = get().users!;
                newUsers = newUsers?.filter((user) => user._id !== id);
                set((state) => ({ ...state, users: newUsers }));
                return data;
            }
        } catch (error: any) {
            console.error('Delete User failed:', error);
            console.log({ error });
            return error?.response?.data;
        }
    },
}));

export default useAuthStore;
