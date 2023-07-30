interface Endpoints {
    register: string;
    login: string;
    logout: string;
    getProfile: string;

    // Owner
    createService: string;
    getAllServicesForOwner: string;
    getServiceById: string;
    updateServiceById: string;
    deleteServiceById: string;

    getAllBookingByOwnerID: string;

    updateBookingStatus: string;

    // Customer
    getAllServicesForCustomer: string;
    getAllBooking: string;
    createBookings: string;
    getAllBookingByCustomerID: string;
}

const endpoints: Endpoints = {
    register: '/api/v1/register',
    login: '/api/v1/login',
    logout: '/api/v1/logout',
    getProfile: '/api/v1/myprofile',

    // Owner
    createService: '/api/v1/services',
    getAllServicesForOwner: '/api/v1/services/owner',
    getServiceById: '/api/v1/services',
    updateServiceById: '/api/v1/services',
    deleteServiceById: '/api/v1/services',

    getAllBookingByOwnerID: '/api/v1/bookings/owner',

    updateBookingStatus: '/api/v1/bookings',

    // Customer
    getAllServicesForCustomer: '/api/v1/services/customer',
    getAllBooking: '/api/v1/bookings',
    createBookings: '/api/v1/bookings',
    getAllBookingByCustomerID: '/api/v1/bookings/customer',
};

export default endpoints;
