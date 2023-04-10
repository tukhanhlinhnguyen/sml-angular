import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component Pages
import { ShopGridLsComponent } from './shop-grid-ls/shop-grid-ls.component';
import {ShopGridRsComponent} from "./shop-grid-rs/shop-grid-rs.component";
import {ShopGridFtComponent} from "./shop-grid-ft/shop-grid-ft.component";
import {ShopListLsComponent} from "./shop-list-ls/shop-list-ls.component";
import {ShopListRsComponent} from "./shop-list-rs/shop-list-rs.component";
import {ShopListFtComponent} from "./shop-list-ft/shop-list-ft.component";
import {ShopCategoriesComponent} from "./shop-categories/shop-categories.component";
import {ShopSingleV1Component} from "./shop-single-v1/shop-single-v1.component";
import {ShopSingleV2Component} from "./shop-single-v2/shop-single-v2.component";
import {ShopCartComponent} from "./shop-cart/shop-cart.component";
import {CheckoutDetailsComponent} from "./checkout-details/checkout-details.component";
import {CheckoutShippingComponent} from "./checkout-shipping/checkout-shipping.component";
import {CheckoutPaymentComponent} from "./checkout-payment/checkout-payment.component";
import {CheckoutReviewComponent} from "./checkout-review/checkout-review.component";
import {CheckoutCompleteComponent} from "./checkout-complete/checkout-complete.component";
import {OrderTrackingComponent} from "./order-tracking/order-tracking.component";
import {ComparisonComponent} from "./comparison/comparison.component";

const routes: Routes = [
  { path:'grid-ls', component:ShopGridLsComponent },
  { path:'grid-rs', component:ShopGridRsComponent },
  { path:'grid-ft', component:ShopGridFtComponent },
  { path:'list-ls', component:ShopListLsComponent },
  { path:'list-rs', component:ShopListRsComponent },
  { path:'list-ft', component:ShopListFtComponent },
  { path:'categories', component:ShopCategoriesComponent },
  { path:'single-v1', component:ShopSingleV1Component },
  { path:'single-v2', component:ShopSingleV2Component },
  { path:'cart', component:ShopCartComponent },
  { path:'checkout-details', component:CheckoutDetailsComponent },
  { path:'checkout-shipping', component:CheckoutShippingComponent },
  { path:'checkout-payment', component:CheckoutPaymentComponent },
  { path:'checkout-review', component:CheckoutReviewComponent },
  { path:'checkout-complete', component:CheckoutCompleteComponent },
  { path:'order-tracking', component:OrderTrackingComponent },
  { path:'comparison', component:ComparisonComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ShopsRoutingModule { }
