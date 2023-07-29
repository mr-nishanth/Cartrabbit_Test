interface Endpoints {
    register: string;
    login: string;
    logout: string;
    getProfile: string;

    rooms: string;
    roomsForCustomer: string;
    deleteUser: string;

    bookings: string;
}

const endpoints: Endpoints = {
    register: '/api/v1/register',
    login: '/api/v1/login',
    logout: '/api/v1/logout',
    getProfile: '/api/v1/myprofile',

    deleteUser: '/api/v1/admin/user',
    rooms: '/api/v1/rooms',
    roomsForCustomer: '/api/v1/rooms/customer',
    bookings: '/api/v1/bookings',
};

export default endpoints;
