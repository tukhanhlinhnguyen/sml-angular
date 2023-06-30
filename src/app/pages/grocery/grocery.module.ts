import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbNavModule, NgbPaginationModule, NgbTooltipModule , NgbAccordionModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxImageZoomModule } from 'ngx-image-zoom';

// Swiper Slider
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

// page routing
import { GroceryRoutingModule } from './grocery-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

// Language
import { LanguageService } from '../../services/language/language.service';
import { TranslateModule } from '@ngx-translate/core';

// Component
import { HomeComponent } from './home/home.component';
import { ProductCatalogComponent } from './product-catalog/product-catalog.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProposalComponent } from './proposal/proposal.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { SearchPageComponent } from './search-page/search-page.component';

@NgModule({
  declarations: [
    HomeComponent,
    ProductCatalogComponent,
    SingleProductComponent,
    CheckoutComponent,
    ProposalComponent,
    InvoiceComponent,
    SearchPageComponent
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
    ReactiveFormsModule,
    TranslateModule,
    NgbCollapseModule,
    NgxImageZoomModule
  ],
  providers: [
    LanguageService,
  ]
})
export class GroceryModule { }
