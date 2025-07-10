import { api } from "../instance";
import { CalculateDeliveryRequest } from "@/types/delivery/CalculateDeliveryRequest";
import { CalculateDeliveryResponse } from "@/types/delivery/CalculateDeliveryResponse";

export const calculateDelivery = async (request: CalculateDeliveryRequest) => {
    return api.post<CalculateDeliveryResponse>("delivery/calc", request);
};  