import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../services/product.service';
import { IProductCategory } from '../interfaces/product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  subscriptions: Subscription[] = [];
  categories: IProductCategory[];

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.getCategories();
    this.getProducts();
  }

  getCategories() {
    this.subscriptions.push(
      this.productService
        .getProductCategories()
        .subscribe(res => {
          const category: IProductCategory = {
            id: '',
            name: 'All Categories',
            isActive: true,
          };
          this.categories = [category, ...res];
        })
    );
  }

  getProducts() {
    this.subscriptions.push(
      this.productService
        .getProducts()
        .subscribe(res => {
          // this.categories = [category, ...res];
        })
    );
  }

  filterProducts(category: IProductCategory) {
    this.categories.map(x => x.isActive = false);
    category.isActive = true;
  }

}
