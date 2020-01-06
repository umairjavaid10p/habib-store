import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { ICategory, IProduct } from 'src/app/common/interfaces/product';
import { ProductsService } from 'src/app/services/products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  productForm: FormGroup;
  categories: ICategory[] = [];
  prodId: string;
  subscriptions: Subscription[] = [];

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getCategories();
    this.initializeForm();
    this.prodId = this.activatedRoute.snapshot.params.id;
    if (this.prodId) {
      this.getProductAndInitialize(this.prodId);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe);
  }

  getProductAndInitialize(id: string) {
    this.subscriptions.push(
      this.productsService.getProduct(id)
        .subscribe((product: IProduct) => {
          // const selectedCategory = this.categories.find(x => x.name === product.category.name);
          this.productForm.controls.title.setValue(product.title);
          this.productForm.controls.price.setValue(product.price);
          this.productForm.controls.category.setValue(product.category);
          this.productForm.controls.imageUrl.setValue(product.imageUrl);
        })
    );
  }

  getCategories() {
    this.subscriptions.push(
      this.productsService.getProductCategories().subscribe(categories => {
        this.categories = categories;
      })
    );
  }

  initializeForm() {
    this.productForm = new FormGroup({
      title: new FormControl('', [ Validators.required ]),
      price: new FormControl('', [ Validators.required ]),
      category: new FormControl('', [ Validators.required ]),
      imageUrl: new FormControl('', [ Validators.required ]),
    });
  }

  onSubmit() {
    const product: IProduct = this.productForm.value;
    if (this.prodId) {
      this.productsService.updateProduct(product, this.prodId).then(() => {
        this.router.navigate(['/admin/products']);
      });
    } else {
      this.productsService.createProduct(product).then(() => {
        this.router.navigate(['/admin/products']);
      });
    }
  }

}
