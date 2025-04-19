import { Controller, Post, Body } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { InitializeTransactionDto } from './dto/initialize-transaction.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('/initialize')
  async inititializeTransaction(@Body() dto: InitializeTransactionDto) {
    return await this.transactionsService.initializeTransaction(dto);
  }

  // @Get('/callback')
  // async verifyTransaction(
  //   @Query() query: PaystackCallbackDto,
  // ): Promise<Transaction> {
  //   return await this.transactionsService.verifyTransaction(query);
  // }
}
