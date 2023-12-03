import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { Product } from './product.interface';
import { NewProductDto } from './dto/new-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import * as fsp from 'node:fs/promises';
import {
  AcceptableLanguages,
  ClientLanguage,
} from '../middlewares/client-language.decorator';

@Controller('products')
export class ProductsController {
  private logger = new Logger(ProductsController.name);

  constructor(private productService: ProductsService) {}

  @Post()
  addNew(@Body() product: NewProductDto): Product {
    this.logger.log('About to add');
    this.logger.log(product);
    return this.productService.create(product);
  }

  @Get()
  getAll(@Query('name') searchByName: string): readonly Product[] {
    return this.productService.getAll(searchByName);
  }

  // @Get('test-file')
  // async getAllFromFile() {
  //   try {
  //     const fileData = await fsp.readFile('not-existing-file.txt');
  //     return { fileData };
  //   } catch {
  //     throw new NotFoundException(
  //       'Missing file. Cannot find not-existing-file.txt',
  //     );
  //   }
  // }

  @Get('test-file')
  async getAllFromFile() {
    const fileData = await fsp.readFile('not-existing-file.txt');
    return { fileData };
  }

  @Get('sample-error')
  async getSampleError(@ClientLanguage() lang: AcceptableLanguages) {
    throw new BadRequestException(
      lang === 'pl'
        ? 'Błąd z przykładową wiadomością'
        : 'Error with sample message',
    );
  }

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
