import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../services/product.service';
import { IProductCategory, IProduct, ICart } from '../interfaces/product.interface';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  categories: IProductCategory[];
  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  subscriptions: Subscription[] = [];
  cart: ICart;


  constructor(
    private productService: ProductService,
    private cartService: CartService,
  ) { }

  ngOnInit() {
    this.getCategories();
    this.getProducts();
    this.getCart();
  }

  async getCart() {
    const cartId = await this.cartService.getCartId();
    this.subscriptions.push(
      this.cartService
        .getCart(cartId)
        .subscribe((cart: ICart) => {
          this.cart = cart;
        })
    );
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
          this.filteredProducts = this.products = res;
        })
    );
  }

  filterProducts(category: IProductCategory) {
    this.categories.map(x => x.isActive = false);
    category.isActive = true;
    if (!category.id) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(x => x.category === category.name);
    }
  }

}
