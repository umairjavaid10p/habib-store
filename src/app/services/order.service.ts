import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IOrder } from '../interfaces/product.interface';
import { FIREBASE_TABLES } from '../constants/firebase.constants';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private db: AngularFireDatabase) { }

  getAllOrders(): Observable<IOrder[]> {
    return this.db.list(FIREBASE_TABLES.orders).snapshotChanges().pipe(
      map(items => {
        return items.map(x => {
          const order: IOrder = x.payload.val() as IOrder;
          order.id = x.key;
          return order;
        });
      }),
    );
  }

  getOrder(id: string) {
    const url = `${FIREBASE_TABLES.orders}/${id}`;
    return this.db.object(url).valueChanges();
  }

  createOrder(order: IOrder) {
    return this.db.list(FIREBASE_TABLES.orders).push(order);
  }

  updateProduct(order: IOrder, id: string) {
    const url = `${FIREBASE_TABLES.orders}/${id}`;
    return this.db.object(url).update(order);
  }
}
