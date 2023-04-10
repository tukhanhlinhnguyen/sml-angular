import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// component
import { HomeComponent } from './home/home.component';
import { ProductCatalogComponent } from './product-catalog/product-catalog.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
      path: 'product-catalog',
      component:ProductCatalogComponent
    },
    {
      path: 'single-product',
      component:SingleProductComponent
    },
    {
      path: 'checkout',
      component:CheckoutComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GroceryRoutingModule { }
