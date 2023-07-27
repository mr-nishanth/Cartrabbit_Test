interface SignUp {
    name: string;
    email: string;
    mobile: string;
    password: string;
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
}

interface EditProfile {
    name: string | undefined;
    email: string | undefined;
    mobile: string | undefined;
}
