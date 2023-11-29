import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Product } from './product.interface';
import { NewProductDto } from './dto/new-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post()
  addNew(@Body() product: NewProductDto): Product {
    return this.productService.create(product);
  }

  @Get()
  getAll(@Query('name') searchByName: string): readonly Product[] {
    return this.productService.getAll(searchByName);
  }
  w;

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) productId: number): Product {
    return this.productService.getOne(productId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) productId: number,
    @Body() product: UpdateProductDto,
  ): Product {
    return this.productService.update(productId, product);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) productId: number): void {
    return this.productService.removeById(productId);
  }
}
