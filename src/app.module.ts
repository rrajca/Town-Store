import { MiddlewareConsumer, Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import * as path from 'path';
import { AllErrorsFilter } from './errors/all-errors.filter';
import { APP_FILTER } from '@nestjs/core';
import { CookieCheckMiddleware } from './middlewares/cookie-check.middleware';
import { LanguageExtractorMiddleware } from './middlewares/language-extractor.middleware';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: 'debug',
        useLevel: 'debug',
        transport: {
          target: path.resolve(__dirname, 'pino-pretty-config.js'),
        },
        quietReqLogger: true,
      },
    }),
    ProductModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllErrorsFilter,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LanguageExtractorMiddleware, CookieCheckMiddleware)
      .forRoutes('*');
  }
}
