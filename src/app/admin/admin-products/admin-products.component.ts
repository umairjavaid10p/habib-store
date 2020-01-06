import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  products: IProduct[];
  filteredProducts: IProduct[] = [];

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  ngOnDestroy() {
    this.subscriptions.map(x => x.unsubscribe());
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

  filter(text) {
    this.filteredProducts = this.products.filter(x =>
      x.title.toLowerCase().indexOf(text.toLowerCase()) !== -1);
  }

  deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id);
    }
  }

}
