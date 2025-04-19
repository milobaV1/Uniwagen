import { Injectable, NotFoundException } from '@nestjs/common';
import { InitializeTransactionDto } from './dto/initialize-transaction.dto';
import {
  PaystackCreateTransactionDto,
  PaystackCreateTransactionResponseDto,
  PaystackMetadata,
} from './dto/paystack.dto';
import { Transaction } from './entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from '../listings/entities/listing.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { PAYSTACK_TRANSACTION_INI_URL } from 'src/core/constants/constants';

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
      userId: userId,
      listingId: listingId,
      customFields: [
        {
          displayName: 'Name',
          variableName: 'name',
          value: user.firstName,
        },
        {
          displayName: 'Email',
          variableName: 'email',
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
      paystackCreateTransactionDto.callbackUrl = paystackCallbackUrl;
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
    } catch (error) {
      console.error('Error initializing transaction:', error);
    }

    const data = result?.data;
    if (result?.status === true) {
      const transaction = this.transactionRepository.create({
        transactionReference: data?.reference,
        paymentLink: data?.authorizationUrl,
        listingId: listing.id,
      });

      return await this.transactionRepository.save(transaction);
    }
    return null;
  }

  async verifyTransaction() {}
}
