import { CreateOtpRequest } from "@/types/auth/CreateOtpRequest";
import { CreateOtpResponse } from "@/types/auth/CreateOtpResponse";
import { api } from "../instance";


export function createOtp(data: CreateOtpRequest) {
    return api.post<CreateOtpResponse>('auth/otp', data);
}
