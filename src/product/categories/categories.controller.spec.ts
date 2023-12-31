import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { categoriesList } from './categories-list';

describe('CategoriesController', () => {
  let categoriesController: CategoriesController;

  const categories = categoriesList;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
    }).compile();

    categoriesController = app.get<CategoriesController>(CategoriesController);
  });

  describe('root', () => {
    it('should return categories array', () => {
      expect(categoriesController.getAll()).toEqual(categories);
    });
  });
});
