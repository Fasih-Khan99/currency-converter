import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CurrencyService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService // Inject the service
  ) { }

  // Use getters to retrieve values from ConfigService
  private get apiKey(): string {
    const key = this.configService.get<string>('CURRENCY_API_KEY');
    if (!key) {
      throw new Error('CURRENCY_API_KEY is not defined in environment variables');
    }
    return key;
  }

  private get baseUrl(): string {
    const url = this.configService.get<string>('CURRENCY_BASE_URL');
    if (!url) {
      throw new Error('CURRENCY_BASE_URL is not defined in environment variables');
    }
    return url;
  }

  async getCurrencies() {
    const { data } = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/currencies?apikey=${this.apiKey}`)
    );
    return data;
  }

  async convert(base_currency: string, date?: string) {
    const endpoint = date ? '/historical' : '/latest';
    const dateParam = date ? `&date=${date}` : '';

    const { data } = await firstValueFrom(
      this.httpService.get(
        `${this.baseUrl}${endpoint}?apikey=${this.apiKey}&base_currency=${base_currency}${dateParam}`
      )
    );
    return data;
  }
}