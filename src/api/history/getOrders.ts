import { GetOrdersResponse } from "@/types/history/getOrdersResponse";
import { api } from "../instance";

export const getOrders = async () => {
    return  await api.get<GetOrdersResponse>('delivery/orders');
}