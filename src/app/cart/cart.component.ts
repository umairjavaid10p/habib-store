import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICart, ICartItem } from '../interfaces/product.interface';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { IUser } from '../interfaces/user.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  cart: ICart;
  user: IUser;
  totalItems = 0;
  subscriptions: Subscription[] = [];
  cartId: string;
  cartItems: ICartItem[] = [];
  totalAmount = 0;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getCart();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe);
  }

  async getCart() {
    this.cartId = await this.cartService.getCartId();
    this.subscriptions.push(
      this.cartService
        .getCart(this.cartId)
        .subscribe((cart: ICart) => {
          this.cart = cart;
          if (cart && cart.items) {
            this.cartItems = Object.values(cart.items);
            this.totalItems = this.cartService.getTotalItems(cart);
            this.totalAmount = this.cartService.getTotalAmount(cart);
          } else {
            this.cartItems = [];
            this.totalAmount = 0;
            this.totalItems = 0;
          }
        })
      );
  }

  async addToCart(item: ICartItem) {
    item.quantity += 1;
    this.cartService.updateCart(item.product, this.cartId, item.quantity);
  }

  async subFromCart(item: ICartItem) {
    if (!item.quantity) {
      return;
    }
    item.quantity -= 1;
    this.cartService.updateCart(item.product, this.cartId, item.quantity);
  }

  clearShoppingCart() {
    if (confirm('Are you sure you want to clea shopping cart?')) {
      this.cartService.clearShoppingCart(this.cartId);
    }
  }

  checkout() {
    this.router.navigate(['/check-out']);
  }
}
