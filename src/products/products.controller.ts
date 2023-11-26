import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Product } from './product.interface';
import { productList } from './product-list';
import { NewProductDto } from './dto/new-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  private productId: number = productList.length;
  private products: Product[] = productList;

  @Post()
  addNew(@Body() product: NewProductDto): Product {
    const newProduct: Product = {
      id: ++this.productId,
      stock: 0,
      ...product,
    };
    this.products.push(newProduct);

    return newProduct;
  }

  @Get()
  getAll(): Product[] {
    return this.products;
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) productId: number): Product {
    return this.findProduct(productId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) productId: number,
    @Body() product: UpdateProductDto,
  ): Product {
    const productToUpdate = this.findProduct(productId);

    Object.assign(productToUpdate, product);

    return productToUpdate;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) productId: number): void {
    this.findProduct(productId);
    this.products = this.products.filter(
      (category) => category.id !== productId,
    );
  }

  private findProduct(productId: number): Product {
    const product = this.products.find((product) => product.id === productId);

    if (!product) {
      throw new NotFoundException(`product with id: ${productId} not found`);
    }

    return product;
  }
}
