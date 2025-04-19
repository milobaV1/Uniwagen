/* eslint-disable prettier/prettier */
export type PaystackCreateTransactionDto = {
  amount: number;
  email: string;
  callbackUrl?: string;
  metadata: PaystackMetadata;
};

export type PaystackMetadata = {
  userId: string;
  listingId: string;
  callbackUrl?: string;
  customFields: PaystackMetadataCustomField[];
};

export type PaystackMetadataCustomField = {
  displayName: string;
  variableName: string;
  value: string | number;
};

export type PaystackCreateTransactionResponseDto = {
  status: boolean;
  message: string;
  data: { authorizationUrl: string; accessCode: string; reference: string };
};

export type PaystackVerifyTransactionResponseDto = {
  status: boolean;
  message: string;
  data: {
    status: string;
    reference: string;
  };
};

export type PaystackWebhookDto = {
  event: string;
  data: Data;
};

export type Data = {
  id?: number;
  domain?: string;
  status?: string;
  reference?: string;
  amount?: number;

  gatewayResponse?: string;
  paidAt?: string;
  createdAt?: string;
  channel?: string;
  currency?: string;
  ipAddress?: string;
  metadata?: any;

  message?: any;
  fees: any;
  log: any;
  customer: any;
  authorization: any;
  plan: any;
};

export class PaystackCallbackDto {
  reference: string;
}
