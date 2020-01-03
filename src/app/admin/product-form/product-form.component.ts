import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IProductCategory, IProduct } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  productform: FormGroup;
  categories: IProductCategory[];
  subscriptions: Subscription[] = [];
  id: string;

  constructor(
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getCategories();
    this.initializeForm();
    this.id = this.activatedRoute.snapshot.params.id;
    if (this.id) {
      this.populateForm(this.id);
    }
  }

  ngOnDestroy() {
    this.subscriptions.map(subs => subs.unsubscribe());
  }

  initializeForm() {
    this.productform = new FormGroup({
      title: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      imageUrl: new FormControl('', Validators.required),
    });
  }

  populateForm(id: string) {
    this.subscriptions.push(
      this.productService.getProductById(id)
        .subscribe((product: IProduct) => {
          this.productform.controls.title.setValue(product.title);
          this.productform.controls.price.setValue(product.price);
          this.productform.controls.category.setValue(product.category);
          this.productform.controls.imageUrl.setValue(product.imageUrl);
        })
    );
  }

  getCategories() {
    this.subscriptions.push(
      this.productService
        .getProductCategories()
        .subscribe(res => {
          this.categories = res;
        })
    );
  }

  onSubmit() {
    const body: IProduct = this.productform.value;
    if (this.id) {
      this.productService.updateProduct(this.id, body).then(() => {
        this.router.navigate(['/admin/manage-products']);
      });
    } else {
      this.productService.createProduct(body).then(() => {
        this.router.navigate(['/admin/manage-products']);
      });
    }
  }

}
