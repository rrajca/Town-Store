import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AppService } from '../app.service';
import { NewCategoryDto } from './dto/new-category.dto';
import { Category } from './category.interface';
import { categoriesList } from './categories-list';

@Controller('categories')
export class CategoriesController {
  private nextId = 8;
  private categories: Category[] = categoriesList;

  constructor(private readonly appService: AppService) {}

  @Get()
  getAll(): Category[] {
    return this.categories;
  }

  @Get(':id')
  getSingleCategory(@Param('id', ParseIntPipe) categoryId: number): Category {
    return this.findCategory(categoryId);
  }

  @Post()
  addNewCategory(@Body() category: NewCategoryDto): Category {
    const newCategory: Category = { id: this.nextId++, ...category };
    this.categories.push(newCategory);

    return newCategory;
  }

  @Delete(':id')
  removeCategory(@Param('id', ParseIntPipe) categoryId: number) {
    this.findCategory(categoryId);
    this.categories = this.categories.filter(
      (category) => category.id !== categoryId,
    );

    return { id: categoryId, removed: true };
  }

  private findCategory(categoryId: number): Category {
    const category = this.categories.find(
      (category) => category.id === categoryId,
    );

    if (!category) {
      throw new NotFoundException(`category with id: ${categoryId} not found`);
    }

    return category;
  }
}
