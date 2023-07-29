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
    user: User;
    token?: string;
    users?: User[];
    room?: Room;
    rooms?: Room[];
}

interface RoomStore {
    rooms: Room[] | null;
}

interface Room {
    _id: string;
    ownerId: {
        _id: string;
        name: string;
    };
    name: string;
    numBeds: number;
    photos: string;
    minStay: number;
    maxStay: number;
    rentPerDay: number;
    image?: string;
    bookingId?: {
        startDate: Date | undefined;
        endDate: Date | undefined;
    };
}

interface AddRoom {
    name: string;
    numBeds: string | null;
    minStay: string | null;
    maxStay: string | null;
    rentPerDay: string | null;
    image?: string;
}
