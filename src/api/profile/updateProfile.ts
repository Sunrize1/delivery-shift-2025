import { User } from "@/types/auth/AuthResponse";
import { api } from "../instance";


export function updateProfile(data: User) { 
    return api.patch('/users/profile', data);
}