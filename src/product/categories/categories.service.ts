import {Inject, Injectable, Logger, NotFoundException} from '@nestjs/common';
import { Category } from './category.interface';
import { categoriesList } from './categories-list';
import { NewCategoryDto } from './dto/new-category.dto';
import {Knex} from "knex";

@Injectable()
export class CategoriesService {
  private logger = new Logger(CategoriesService.name);
  private categories: Category[] = categoriesList;

  constructor(@Inject('DbConnection') private readonly knex: Knex) {
  }

  getAll(): readonly Category[] {
    return this.categories;
  }

  getOne(categoryId: number): Category {
    return this.findCategory(categoryId);
  }

  create(category: NewCategoryDto): Category {
    const newCategory: Category = { id: this.generateNextId(), ...category };
    this.categories.push(newCategory);

    return newCategory;
  }

  removeById(categoryId: number) {
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

  private generateNextId(): number {
    return Math.max(...this.categories.map((c) => c.id)) + 1;
  }
}
