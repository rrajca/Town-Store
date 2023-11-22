import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

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
  getSingleCategory(@Param('id') categoryId: string): Category {
    return this.categories[+categoryId - 1];
  }

  @Post()
  addNewCategory(@Body() category: { name: string }): Category {
    const newCategory: Category = { id: this.nextId++, name: category.name };
    this.categories.push(newCategory);

    return newCategory;
  }

  @Delete(':id')
  removeCategory(@Param('id') categoryId: string): Category {
    const categoryToRemove = this.categories.find(
      (category) => category.id === +categoryId,
    );

    if (categoryToRemove) {
      this.categories.splice(categoryToRemove.id - 1, 1);
    }

    return categoryToRemove;
  }
}
