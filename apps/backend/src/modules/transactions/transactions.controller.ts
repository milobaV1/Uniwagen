import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Headers,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { InitializeTransactionDto } from './dto/initialize-transaction.dto';
import { ApiTags } from '@nestjs/swagger';
import { PaystackCallbackDto, PaystackWebhookDto } from './dto/paystack.dto';
import { Transaction } from './entities/transaction.entity';
import { PAYSTACK_WEBHOOK_SIGNATURE_KEY } from 'src/core/constants/constants';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('/initialize')
  async inititializeTransaction(@Body() dto: InitializeTransactionDto) {
    return await this.transactionsService.initializeTransaction(dto);
  }

  @Get('/callback')
  async verifyTransaction(
    @Query() query: PaystackCallbackDto,
  ): Promise<Transaction | null> {
    return await this.transactionsService.verifyTransaction(query);
  }

  @Post('/webhook')
  @HttpCode(HttpStatus.OK)
  async paymentWebhookHandler(
    @Body() dto: PaystackWebhookDto,
    @Headers() headers = {},
  ) {
    const result = await this.transactionsService.handlePaystackWebhook(
      dto,
      `${headers[PAYSTACK_WEBHOOK_SIGNATURE_KEY]}`,
    );
    if (!result) {
      throw new BadRequestException();
    }
  }
}
