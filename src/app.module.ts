import { Module } from '@nestjs/common';
import { CategoriesController } from './categories/categories.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';

@Module({
  imports: [],
  controllers: [CategoriesController, ProductsController],
  providers: [AppService],
})
export class AppModule {}
