import { api } from "../instance";

export const cancelOrder = async (orderId: string) => {
    return api.put(`delivery/orders/cancel`, {
        orderId: orderId
    });
}