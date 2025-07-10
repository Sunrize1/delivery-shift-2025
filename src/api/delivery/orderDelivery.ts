import { OrderDeliveryRequest } from "@/types/delivery/OrderDeliveryRequest";
import { api } from "../instance";

export const orderDelivery = async (data: OrderDeliveryRequest) => {
    return await api.post('/delivery/order', data);
}
