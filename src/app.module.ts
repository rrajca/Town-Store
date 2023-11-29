import { Module } from '@nestjs/common';
import { CategoriesController } from './categories/categories.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';

@Module({
  imports: [],
  controllers: [CategoriesController, ProductsController],
  providers: [AppService, ProductsService],
})
export class AppModule {}
