import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';


const routes: Routes = [
  {path: '', component: ProductsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cart', component: CartComponent},
  {path: 'check-out', component: CheckoutComponent},
  {path: 'my-orders', component: MyOrdersComponent},
  {path: 'admin/manage-orders', component: AdminOrdersComponent},
  {path: 'admin/manage-products', component: AdminProductsComponent},
  {path: 'admin/create-product', component: ProductFormComponent},
  {path: 'admin/edit-product/:id', component: ProductFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
