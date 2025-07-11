import { Order } from "../history/getOrdersResponse";

export interface OrderDeliveryResponse {
  success: boolean;
  reason: string;
  order: Order;
} 