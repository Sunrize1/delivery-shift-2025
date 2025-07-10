import { Package } from "./PackagesTypesResponse";

export interface CalculateDeliveryRequest {
    package: Package;
    senderPoint: {
        latitude: string;
        longitude: string;
    };
    receiverPoint: {
        latitude: string;
        longitude: string;
    };
}