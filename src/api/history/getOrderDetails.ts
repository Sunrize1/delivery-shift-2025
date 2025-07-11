import { OrderDeliveryResponse } from "@/types/delivery/OrderDeliveryResponse";
import { api } from "../instance";

export const getOrderDetails = async (id: string) => {
    return await api.get<OrderDeliveryResponse>(`delivery/orders/${id}`);
}