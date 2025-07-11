export interface GetOrdersResponse {
    success: boolean;
    orders: Order[]
}

export interface Order {
    _id: string;
    price?: number;
    package?: {
      id: string;
      name: string;
      length: number;
      width: number;
      weight: number;
      height: number;
    },
    option?: string;
    senderPoint: {
      id: string;
      name: string;
      latitude: number;
      longitude: number;
    },
    senderAddress: {
      street: string;
      house: string;
      apartment: string;
      comment?: string;
      isNonContact?: boolean;
    },
    sender: {
      firstname: string;
      lastname: string;
      middlename?: string;
      phone: string;
    },
    receiverPoint: {
      id: string;
      name: string;
      latitude: number;
      longitude: number;
    },
    receiverAddress: {
      street: string;
      house: string;
      apartment: string;
      comment?: string;
      isNonContact?: boolean;
    },
    receiver: {
      firstname: string;
      lastname: string;
      middlename?: string;
      phone: string;
    },
    payer: string;
    status: number;
    cancellable: boolean;
    created: string;
    updated: string;
  }