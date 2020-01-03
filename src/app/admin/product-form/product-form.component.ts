import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IProductCategory } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productform: FormGroup;
  categories: IProductCategory[];
  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.productService
      .getProductCategories()
      .subscribe(res => {
        this.categories = res;
      });
    this.productform = new FormGroup({
      title: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      imageUrl: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    console.log(this.productform.value);
  }

}
