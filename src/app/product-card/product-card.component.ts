import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { IProduct, ICart } from '../common/interfaces/product';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnChanges {
  @Input() product: IProduct;
  @Input() cart: ICart;
  cartId: string;
  quantity = 0;

  constructor(
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.cart.currentValue !== changes.cart.previousValue &&
      this.cart && this.cart.items &&
      this.cart.items[this.product.id]
    ) {
      this.quantity = this.cart.items[this.product.id].quantity;
    }
  }

  async addToCart(product: IProduct) {
    this.quantity += 1;
    if (!this.cartId) {
      this.cartId = await this.shoppingCartService.getCartId();
    }
    this.shoppingCartService.updateCart(product, this.cartId, this.quantity);
  }

  async subFromCart(product: IProduct) {
    if (!this.quantity) {
      return;
    }
    this.quantity -= 1;
    if (!this.cartId) {
      this.cartId = await this.shoppingCartService.getCartId();
    }
    this.shoppingCartService.updateCart(product, this.cartId, this.quantity);
  }
}
