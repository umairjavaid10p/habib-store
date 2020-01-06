import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FIREBASE_TABLES } from '../constants/firebase.constants';
import { IProduct, ICartItem, IProductCategory, ICart } from '../interfaces/product.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private db: AngularFireDatabase) { }

  async getCartId() {
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
      const result = await this.createCart();
      cartId = result.key;
      localStorage.setItem('cartId', result.key);
    }
    return cartId;
  }

  createCart() {
    return this.db.list(FIREBASE_TABLES.shoppingCarts).push({
      createdDate: new Date().getTime(),
    });
  }

  getCart(id: string) {
    const url = `${FIREBASE_TABLES.shoppingCarts}/${id}`;
    return this.db.object(url).valueChanges();
  }

  getCartItem(cartId: string, productId: string) {
    const url = `${FIREBASE_TABLES.shoppingCarts}/${cartId}/items/${productId}`;
    return this.db.object(url);
  }

  updateCart(product: IProduct, cartId: string, quantity) {
    const productCart = this.getCartItem(cartId, product.id);
    let cartItem: ICartItem = null;
    if (quantity) {
      cartItem = { product, quantity };
    }
    productCart.set(cartItem);
  }

  clearShoppingCart(cartId: string) {
    const url = `${FIREBASE_TABLES.shoppingCarts}/${cartId}`;
    this.db.object(url).set({ items: null });
  }

  getTotalItems(cart: ICart) {
    let totalItems = 0;
    if (!cart || !cart.items) {
      return totalItems;
    }
    const products = Object.values(cart.items);
    products.map(x => {
      totalItems += x.quantity;
    });
    return totalItems;
  }

  getTotalAmount(cart: ICart) {
    let totalAmount = 0;
    if (!cart || !cart.items) {
      return totalAmount;
    }
    const products = Object.values(cart.items);
    products.map(x => {
      totalAmount += (x.quantity * x.product.price);
    });
    return totalAmount;
  }
}
