import { Injectable } from '@angular/core';
import { IProductCategory, IProduct } from '../interfaces/product.interface';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FIREBASE_TABLES } from '../constants/firebase.constants';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private db: AngularFireDatabase) { }

  getProductCategories(): Observable<IProductCategory[]> {
    return this.db
      .list(FIREBASE_TABLES.categories)
      .snapshotChanges()
      .pipe(
        map(items => {
          return items.map(item => {
            const out: IProductCategory = {
              id: item.key,
              name: item.payload.val() as string,
            };
            return out;
            // return {
            //   id: item.key,
            //   name: item.payload.val(),
            // } as IProductCategory;
          });
        })
      );
  }

  getProducts(): Observable<IProduct[]> {
    return this.db
      .list(FIREBASE_TABLES.products)
      .snapshotChanges()
      .pipe(
        map(items => {
          return items.map(item => {
            const out: IProduct = item.payload.val() as IProduct;
            out.id = item.key;
            return out;
            // return {
            //   id: item.key,
            //   name: item.payload.val(),
            // } as IProductCategory;
          });
        })
      );
  }

  getProductById(id: string) {
    const url = `${FIREBASE_TABLES.products}/${id}`;
    return this.db
      .object(url)
      .valueChanges();
  }

  createProduct(body: IProduct) {
    return this.db
      .list(FIREBASE_TABLES.products)
      .push(body);
  }

  updateProduct(id: string, body: IProduct) {
    const url = `${FIREBASE_TABLES.products}/${id}`;
    return this.db
      .object(url)
      .update(body);
  }
}
