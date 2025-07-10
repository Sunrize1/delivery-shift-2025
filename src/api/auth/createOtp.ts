import { api } from "../instance";
import { CreateOtpRequest } from "@/types/auth/CreateOtpRequest";
import { CreateOtpResponse } from "@/types/auth/CreateOtpResponse";

export function createOtp(data: CreateOtpRequest) {
    return api.post<CreateOtpResponse>('auth/otp', data);
}
