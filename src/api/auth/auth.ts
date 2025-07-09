import { api } from "../instance";
import { AuthRequest } from "@/types/auth/AuthRequest";
import { AuthResponse } from "@/types/auth/AuthResponse";


export function auth(data: AuthRequest) {
    return api.post<AuthResponse>('users/signin', data);
}