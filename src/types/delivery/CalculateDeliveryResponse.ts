import { optionType } from "./OrderDeliveryRequest";

export interface CalculateDeliveryResponse {
    success: boolean;
    reason: string;
    options: CalculateDeliveryOption[];
}

export interface CalculateDeliveryOption {
    id: string;
    price: number;
    days: number;
    name: string;
    type: optionType;
}