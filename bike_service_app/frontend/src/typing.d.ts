interface SignUp {
    name: string;
    email: string;
    mobile: string;
    password: string;
    role: string;
}

interface LogIn {
    email: string;
    password: string;
}

interface InputTypes {
    id: string;
    label: string;
    type: string;
}

interface AuthStore {
    isAuthenticated: boolean;
    user: User | null;
    users: User[] | null;
}

interface User {
    _id: string;
    name: string;
    email: string;
    mobile: string;
    role: string;
}

interface Response {
    success: boolean;
    message?: string;
    user?: User;
    token?: string;
    service?: Service;
    services?: Service[];
    booking?: Booking;
    bookings?: Booking[];
}
interface Booking {
    _id: string;
    customer: {
        _id: string;
        name: string;
        email: string;
        mobile: string;
    };
    service: {
        _id: string;
        ownerId: string;
        name: string;
    };
    date: Date;
    status: string;
}

interface ServiceStore {
    services: Service[] | null;
    searchString: string;
}

interface BookingStore {
    bookings: Booking[] | null;
}

interface Service {
    _id: string;
    ownerId: {
        _id: string;
        name: string;
    };
    name: string;
    description: string;
    price: string | number;
}

interface AddService {
    name: string;
    description: string;
    price: string | number;
}
