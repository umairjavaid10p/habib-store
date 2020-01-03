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
          this.products = res;
        })
    );
  }

  removeProduct(product: IProduct) {
    console.log(product);
  }

}
