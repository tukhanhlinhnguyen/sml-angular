import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbRatingModule, NgbPaginationModule, NgbAccordionModule, NgbTooltipModule, NgbNavModule, NgbCollapseModule, NgbProgressbarModule} from '@ng-bootstrap/ng-bootstrap';

// Ngx Sliders
import { NgxSliderModule } from '@angular-slider/ngx-slider';

// Swiper Slider
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

// Scroll To
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';


// Component
import { SharedModule } from "../../shared/shared.module";
import { ShopsRoutingModule } from "./shops-routing.module";
import { ShopGridLsComponent } from './shop-grid-ls/shop-grid-ls.component';
import { ShopGridRsComponent } from './shop-grid-rs/shop-grid-rs.component';
import { ShopGridFtComponent } from './shop-grid-ft/shop-grid-ft.component';
import { ShopListLsComponent } from './shop-list-ls/shop-list-ls.component';
import { ShopListRsComponent } from './shop-list-rs/shop-list-rs.component';
import { ShopListFtComponent } from './shop-list-ft/shop-list-ft.component';
import { ShopCategoriesComponent } from './shop-categories/shop-categories.component';
import { ShopSingleV1Component } from './shop-single-v1/shop-single-v1.component';
import { ShopSingleV2Component } from './shop-single-v2/shop-single-v2.component';
import { ShopCartComponent } from './shop-cart/shop-cart.component';
import { CheckoutDetailsComponent } from './checkout-details/checkout-details.component';
import { CheckoutShippingComponent } from './checkout-shipping/checkout-shipping.component';
import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component';
import { CheckoutReviewComponent } from './checkout-review/checkout-review.component';
import { CheckoutCompleteComponent } from './checkout-complete/checkout-complete.component';
import { OrderTrackingComponent } from './order-tracking/order-tracking.component';
import { ComparisonComponent } from './comparison/comparison.component';


@NgModule({
  declarations: [
    ShopGridLsComponent,
    ShopGridRsComponent,
    ShopGridFtComponent,
    ShopListLsComponent,
    ShopListRsComponent,
    ShopListFtComponent,
    ShopCategoriesComponent,
    ShopSingleV1Component,
    ShopSingleV2Component,
    ShopCartComponent,
    CheckoutDetailsComponent,
    CheckoutShippingComponent,
    CheckoutPaymentComponent,
    CheckoutReviewComponent,
    CheckoutCompleteComponent,
    OrderTrackingComponent,
    ComparisonComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbRatingModule,
    NgbPaginationModule,
    NgbAccordionModule,
    NgbTooltipModule,
    NgbNavModule,
    NgbCollapseModule,
    NgbProgressbarModule,
    NgxSliderModule,
    SharedModule,
    ShopsRoutingModule,
    NgxUsefulSwiperModule,
    ScrollToModule.forRoot()
  ]
})
export class ShopsModule { }
