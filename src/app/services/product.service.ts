import { Injectable } from '@angular/core';
import { IProductCategory } from '../interfaces/product.interface';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private db: AngularFireDatabase) { }

  getProductCategories(): Observable<IProductCategory[]> {
    return this.db
      .list('categories')
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
}
