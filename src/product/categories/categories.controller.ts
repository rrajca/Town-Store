import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { NewCategoryDto } from './dto/new-category.dto';
import { Category } from './category.interface';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getAll(): readonly Category[] {
    return this.categoriesService.getAll();
  }

  @Get(':id')
  getSingleCategory(@Param('id', ParseIntPipe) categoryId: number): Category {
    return this.categoriesService.getOne(categoryId);
  }

  @Post()
  addNewCategory(@Body() category: NewCategoryDto): Category {
    return this.categoriesService.create(category);
  }

  @Delete(':id')
  removeCategory(@Param('id', ParseIntPipe) categoryId: number) {
    return this.categoriesService.removeById(categoryId);
  }
}
