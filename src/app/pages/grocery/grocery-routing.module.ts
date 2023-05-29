import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// component
import { HomeComponent } from './home/home.component';
import { ProductCatalogComponent } from './product-catalog/product-catalog.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProposalComponent } from './proposal/proposal.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { SearchPageComponent } from './search-page/search-page.component';

const routes: Routes = [
  {
      path: '',
      component: HomeComponent
  },
  {
    path: 'product-catalog/:id',
    component: ProductCatalogComponent
  },
  {
    path: 'single-product',
    component: SingleProductComponent
  },
  {
    path: 'proposal',
    component: ProposalComponent
  },
  {
    path: 'invoice',
    component: InvoiceComponent
  },
  // {
  //   path: 'single-product/:id',
  //   component: SingleProductComponent
  // },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'search/:label',
    component: SearchPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroceryRoutingModule { }
