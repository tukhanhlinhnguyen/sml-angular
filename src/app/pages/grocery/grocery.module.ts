import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbNavModule, NgbPaginationModule, NgbTooltipModule , NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

// Swiper Slider
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

// page routing
import { GroceryRoutingModule } from './grocery-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

// Component
import { HomeComponent } from './home/home.component';
import { ProductCatalogComponent } from './product-catalog/product-catalog.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { CheckoutComponent } from './checkout/checkout.component';

@NgModule({
  declarations: [
    HomeComponent,
    ProductCatalogComponent,
    SingleProductComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    NgxUsefulSwiperModule,
    GroceryRoutingModule,
    SharedModule,
    NgbNavModule,
    NgbPaginationModule,
    NgbTooltipModule,
    NgbAccordionModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class GroceryModule { }
