import { OrderDeliveryRequest } from "@/types/delivery/OrderDeliveryRequest";
import { OrderDeliveryResponse } from "@/types/delivery/OrderDeliveryResponse";
import { api } from "../instance";

export const orderDelivery = async (data: OrderDeliveryRequest): Promise<{ data: OrderDeliveryResponse }> => {
    return await api.post('/delivery/order', data);
}
