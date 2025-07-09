export interface CreateOtpResponse {
    success: boolean;
    reason: string;
    retryDelay: number;
}