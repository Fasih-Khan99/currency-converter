import { Controller, Get, Query } from '@nestjs/common';
import { CurrencyService } from './currency.service';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('list')
  getCurrencies() {
    return this.currencyService.getCurrencies();
  }

  @Get('convert')
  convert(
    @Query('base') base: string,
    @Query('date') date?: string
  ) {
    return this.currencyService.convert(base, date);
  }
}