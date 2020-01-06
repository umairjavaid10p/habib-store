import { Component, OnInit, OnDestroy } from '@angular/core';
import { IProduct, ICategory, ICart } from '../common/interfaces/product';
import { Subscription } from 'rxjs';
import { ProductsService } from '../services/products.service';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  subscriptions: Subscription[] = [];
  allCategory: ICategory = {
    id: '', name: 'All categories', isActive: true,
  };
  categories: ICategory[] = [this.allCategory];
  cart: ICart;

  constructor(
    private productsService: ProductsService,
    private shoppingCartService: ShoppingCartService,
  ) { }

  ngOnInit() {
    this.getAllProducts();
    this.getCategories();
    this.getCart();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe);
  }

  getCategories() {
    this.subscriptions.push(
      this.productsService.getProductCategories().subscribe(categories => {
        this.categories = [this.allCategory, ...categories];
      })
    );
  }

  async getCart() {
    const cartId = await this.shoppingCartService.getCartId();
    this.subscriptions.push(
      this.shoppingCartService
        .getCart(cartId)
        .subscribe((cart: ICart) => {
          this.cart = cart;
        })
    );
  }

  getAllProducts() {
    this.subscriptions.push(
      this.productsService.getAllProducts().subscribe(products => {
        this.filteredProducts = this.products = products;
      })
    );
  }

  filterCategory(category?: ICategory) {
    this.categories.map(x => {
      x.isActive = false;
      return x;
    });
    category.isActive = true;
    if (!category.id) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(x => x.category === category.name);
    }
  }

}
