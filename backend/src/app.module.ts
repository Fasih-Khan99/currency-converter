import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios'; 
import { CurrencyController } from './currency/currency.controller'; 
import { CurrencyService } from './currency/currency.service'; 

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    HttpModule, // 4. Add HttpModule here
  ],
  controllers: [
    AppController, 
    CurrencyController // 5. Register CurrencyController
  ],
  providers: [
    AppService, 
    CurrencyService // 6. Register CurrencyService
  ],
})
export class AppModule {}