interface Endpoints {
    register: string;
    login: string;
    logout: string;
    getProfile: string;
    updateProfile: string;
    getAllUser: string;
    deleteUser: string;
}

const endpoints: Endpoints = {
    register: '/api/v1/register',
    login: '/api/v1/login',
    logout: '/api/v1/logout',
    getProfile: '/api/v1/myprofile',
    updateProfile: '/api/v1/update',
    getAllUser: '/api/v1/admin/users',
    deleteUser: '/api/v1/admin/user',
};

export default endpoints;
