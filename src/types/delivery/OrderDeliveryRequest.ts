export interface OrderDeliveryRequest {
    packageId: string;
    optionType: optionType;
    senderPointId: string;
    senderAddress: {
      street: string;
      house: string;
      apartment: string;
      comment: string;
    },
    sender: {
      firstname: string;
      lastname: string;
      middlename: string;
      phone: string;
    },
    receiverPointId: string;
    receiverAddress: {
      street: string;
      house: string;
      apartment: string;
      comment: string;
      isNonContact: boolean;
    },
    receiver: {
      firstname: string;
      lastname: string;
      middlename: string;
      phone: string;
    },
    payer: payer;
}

export enum payer {
    RECEIVER = 'RECEIVER',
    SENDER = 'SENDER',
}

export enum optionType {
    DEFAULT = 'DEFAULT',
    EXPRESS = 'EXPRESS',
}