export interface OrderDeliveryResponse {
  success: boolean;
  reason: string;
  order: {
    price: number;
    package: {
      id: string;
      name: string;
      length: string;
      width: string;
      weight: string;
      height: string;
    };
    option: string;
    senderPoint: {
      id: string;
      name: string;
      latitude: string;
      longitude: string;
    };
    senderAddress: {
      street: string;
      house: string;
      apartment: string;
      comment: string;
    };
    sender: {
      firstname: string;
      lastname: string;
      middlename: string;
      phone: string;
    };
    receiverPoint: {
      id: string;
      name: string;
      latitude: string;
      longitude: string;
    };
    receiverAddress: {
      street: string;
      house: string;
      apartment: string;
      comment: string;
      isNonContact: boolean;
    };
    receiver: {
      firstname: string;
      lastname: string;
      middlename: string;
      phone: string;
    };
    payer: string;
    status: number;
    cancellable: boolean;
  };
} 