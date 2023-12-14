import { Injectable, NotFoundException } from '@nestjs/common';
import { productList } from './product-list';
import { Product } from './product.interface';
import { NewProductDto } from './dto/new-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ProductsService {
  private products: Product[] = productList;

  constructor(private categoriesService: CategoriesService) {}

  create(product: NewProductDto): Product {
    this.categoriesService.getOne(product.categoryId);
    const newProduct: Product = {
      id: this.generateNextId(),
      stock: 0,
      ...product,
    };
    this.products.push(newProduct);

    return newProduct;
  }

  getAll(searchByName: string = ''): readonly Product[] {
    return this.products.filter((product) =>
      product.name.toLowerCase().includes(searchByName.toLowerCase()),
    );
  }

  getOne(productId: number): Product {
    return this.findProduct(productId);
  }

  update(productId: number, product: UpdateProductDto): Product {
    if (product.categoryId) {
      this.categoriesService.getOne(product.categoryId);
    }

    const productToUpdate = this.findProduct(productId);
    Object.assign(productToUpdate, product);

    return productToUpdate;
  }

  removeById(productId: number): void {
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

  private generateNextId(): number {
    return Math.max(...this.products.map((c) => c.id)) + 1;
  }
}
