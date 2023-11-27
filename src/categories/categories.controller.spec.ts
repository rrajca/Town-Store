import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { AppService } from '../app.service';

describe('CategoriesController', () => {
  let categoriesController: CategoriesController;

  const categories = [
    { id: 1, name: 'Groceries' },
    { id: 2, name: 'Cosmetics' },
    { id: 3, name: 'Toys' },
    { id: 4, name: 'Dairy' },
    { id: 5, name: 'Fashion' },
    { id: 6, name: 'Electronics' },
    { id: 7, name: 'Games' },
  ];

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [AppService],
    }).compile();

    categoriesController = app.get<CategoriesController>(CategoriesController);
  });

  describe('root', () => {
    it('should return categories array', () => {
      expect(categoriesController.getAll()).toEqual(categories);
    });
  });
});
