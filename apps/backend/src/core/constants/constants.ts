/* eslint-disable prettier/prettier */
export const jwtConstants = {
  secret: process.env.JWT_SECRET,
};

export const PAYSTACK_TRANSACTION_INI_URL =
  'https://api.paystack.co/transaction/initialize';

export const PAYSTACK_TRANSACTION_VERIFY_BASE_URL =
  'https://api.paystack.co/transaction/verify';

export const PAYSTACK_SUCCESS_STATUS = 'success';
export const PAYSTACK_WEBHOOK_CRYPTO_ALGO = 'sha512';
export const PAYSTACK_WEBHOOK_SIGNATURE_KEY = 'x-paystack-signature';
