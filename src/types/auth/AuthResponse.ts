export interface User {
    phone: string;
    firstname: string;
    middlename: string;
    lastname: string;
    email: string;
    city: string;
}

export interface AuthResponse {
    success: boolean;
    reason: string;
    user: User;
    token: string;
}