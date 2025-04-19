import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InitializeTransactionDto } from './dto/initialize-transaction.dto';
import {
  PaystackCallbackDto,
  PaystackCreateTransactionDto,
  PaystackCreateTransactionResponseDto,
  PaystackMetadata,
  PaystackVerifyTransactionResponseDto,
  PaystackWebhookDto,
} from './dto/paystack.dto';
import { PaymentStatus, Transaction } from './entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from '../listings/entities/listing.entity';
import { Not, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import axios, { Axios, AxiosResponse } from 'axios';
import {
  PAYSTACK_SUCCESS_STATUS,
  PAYSTACK_TRANSACTION_INI_URL,
  PAYSTACK_TRANSACTION_VERIFY_BASE_URL,
  PAYSTACK_WEBHOOK_CRYPTO_ALGO,
} from 'src/core/constants/constants';
import { createHmac, timingSafeEqual } from 'crypto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Listing)
    private listingRepository: Repository<Listing>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,

    readonly configService: ConfigService,
  ) {}
  async initializeTransaction(
    dto: InitializeTransactionDto,
  ): Promise<Transaction | null> {
    const { listingId, userId } = dto;
    const listing = await this.listingRepository.findOne({
      where: { id: listingId },
    });

    if (!listing) throw new NotFoundException('Not a listing');

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) throw new NotFoundException('Not a user');

    const metadata: PaystackMetadata = {
      user_id: userId,
      listing_id: listingId,
      custom_fields: [
        {
          display_name: 'Name',
          variable_name: 'name',
          value: user.firstName,
        },
        {
          display_name: 'Email',
          variable_name: 'email',
          value: user.email,
        },
      ],
    };

    const paystackCreateTransactionDto: PaystackCreateTransactionDto = {
      email: user.email,
      amount: listing.price,
      metadata,
    };

    const paystackCallbackUrl = this.configService.get('PAYSTACK_CALLBACK_URL');
    if (paystackCallbackUrl) {
      paystackCreateTransactionDto.callback_url = paystackCallbackUrl;
    }

    const payload = JSON.stringify(paystackCreateTransactionDto);
    let result: PaystackCreateTransactionResponseDto | null = null;

    try {
      const response = await axios.post<PaystackCreateTransactionResponseDto>(
        PAYSTACK_TRANSACTION_INI_URL,
        payload,
        {
          headers: {
            Authorization: `Bearer ${this.configService.get<string>(
              'PAYSTACK_SECRET_KEY',
            )}`,
            'Content-Type': 'application/json',
          },
        },
      );
      result = response.data;
      console.log(result);
    } catch (error) {
      console.error('Error initializing transaction:', error);
    }

    const data = result?.data;
    if (result?.status === true) {
      const transaction = this.transactionRepository.create({
        transactionReference: data?.reference,
        paymentLink: data?.authorization_url,
        listingId: listing.id,
      });

      return await this.transactionRepository.save(transaction);
    }
    return null;
  }

  async verifyTransaction(
    dto: PaystackCallbackDto,
  ): Promise<Transaction | null> {
    const transaction = await this.transactionRepository.findOne({
      where: {
        transactionReference: dto.reference,
      },
    });

    if (!transaction) throw new NotFoundException('Transaction not found');

    const reference = transaction.transactionReference;
    const url = `${PAYSTACK_TRANSACTION_VERIFY_BASE_URL}/${reference}`;
    let response: AxiosResponse<PaystackVerifyTransactionResponseDto> | null =
      null;

    try {
      response = await axios.get<PaystackVerifyTransactionResponseDto>(url, {
        headers: {
          Authorization: `Bearer ${this.configService.get<string>(
            'PAYSTACK_SECRET_KEY',
          )}`,
        },
      });
    } catch (error) {
      console.error(error);
    }

    if (!response) {
      console.log('No response');

      return null;
    }
    const result = response.data;
    console.log(result);
    if (!result?.status || !result?.data)
      throw new Error('Failed to verify transaction from Paystack');

    const transactionStatus = result.data.status;
    const paymentConfirmed = transactionStatus === PAYSTACK_SUCCESS_STATUS;
    if (paymentConfirmed) {
      transaction.status = PaymentStatus.PAID;
    } else {
      transaction.status = PaymentStatus.NOTPAID;
    }

    transaction.transactionStatus = transactionStatus;

    return await this.transactionRepository.save(transaction);
  }

  async handlePaystackWebhook(
    dto: PaystackWebhookDto,
    signature: string,
  ): Promise<boolean> {
    if (!dto.data) return false;

    let isValidEvent: boolean = false;

    try {
      const hash = createHmac(
        PAYSTACK_WEBHOOK_CRYPTO_ALGO,
        this.configService.get<string>('PAYSTACK_SECRET_KEY') || '',
      )
        .update(JSON.stringify(dto))
        .digest('hex');

      isValidEvent = !!(
        hash &&
        signature &&
        timingSafeEqual(Buffer.from(hash), Buffer.from(signature))
      );
    } catch (error) {
      console.error(error);
    }
    if (!isValidEvent) return false;

    const transaction = await this.transactionRepository.findOne({
      where: {
        transactionReference: dto.data.reference,
      },
    });

    if (!transaction) throw new NotFoundException('transaction not found');

    const transactionStatus = dto.data.status;
    const paymentConfirmed = transactionStatus === PAYSTACK_SUCCESS_STATUS;

    if (paymentConfirmed) {
      transaction.status = PaymentStatus.PAID;
    } else {
      transaction.status = PaymentStatus.NOTPAID;
    }

    transaction.transactionStatus = transactionStatus || 'UNKNOWN';

    await this.transactionRepository.save(transaction);
    return true;
  }
}
