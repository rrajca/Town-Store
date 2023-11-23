import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { NewCategoryDto } from './new-category.dto';

interface Category {
  id: number;
  name: string;
}

@Controller('categories')
export class AppController {
  private categories: Category[] = [
    { id: 1, name: 'Groceries' },
    { id: 2, name: 'Cosmetics' },
    { id: 3, name: 'Toys' },
    { id: 4, name: 'Dairy' },
    { id: 5, name: 'Fashion' },
    { id: 6, name: 'Electronics' },
    { id: 7, name: 'Games' },
  ];

  private nextId = 8;

  constructor(private readonly appService: AppService) {}

  @Get()
  getAll(): Category[] {
    return this.categories;
  }

  @Get(':id')
  getSingleCategory(@Param('id') categoryId: number): Category {
    return this.findCategory(categoryId);
  }

  @Post()
  addNewCategory(@Body() category: NewCategoryDto): Category {
    const newCategory: Category = { id: this.nextId++, ...category };
    this.categories.push(newCategory);

    return newCategory;
  }

  @Delete(':id')
  removeCategory(@Param('id') categoryId: number) {
    const category = this.findCategory(categoryId);

    if (category) {
      this.categories = this.categories.filter(
        (category) => category.id !== categoryId,
      );
    }

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
