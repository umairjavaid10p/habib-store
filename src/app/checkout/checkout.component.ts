import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ICart, ICartItem, IOrder } from '../interfaces/product.interface';
import { IUser } from '../interfaces/user.interface';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  checkoutForm: FormGroup;
  subscriptions: Subscription[] = [];
  cart: ICart;
  cartItems: ICartItem[] = [];
  user: IUser;
  cartId: string;
  totalAmount = 0;
  totalItems = 0;

  constructor(
    private router: Router,
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.getCart();
    this.initializeForm();
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
          if (this.cart && this.cart.items) {
            this.cartItems = Object.values(this.cart.items);
            this.totalAmount = this.cartService.getTotalAmount(this.cart);
            this.totalItems = this.cartService.getTotalItems(this.cart);
          }
        })
    );
  }

  initializeForm() {
    this.checkoutForm = new FormGroup({
      name: new FormControl('', [ Validators.required ]),
      address: new FormControl('', [ Validators.required ]),
      city: new FormControl('', [ Validators.required ]),
      phone: new FormControl('', [ Validators.required ]),
    });
  }

  onSubmit() {
    const order: IOrder = this.checkoutForm.value;
    order.items = this.cartItems;
    order.amount = this.totalAmount;
    order.isComplete = false;
    order.userId = '1'; // this.user.id;
    order.datePlaced = new Date().toISOString();
    this.orderService.createOrder(order).then(() => {
      this.cartService.clearShoppingCart(this.cartId);
      this.router.navigate(['/order-success']);
    });
  }

}
