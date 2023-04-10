import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbRatingModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

// Swiper Slider
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

//Route
import { HomesRoutingModule } from './homes-routing.module';

// Component
import { SharedModule } from "../../shared/shared.module";
import { IndexComponent } from './index/index.component';
import { ElectronicsComponent } from './electronics/electronics.component';

//Image Zoom
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { FashionStoreV2Component } from './fashion-store-v2/fashion-store-v2.component';
import { SingleStoreComponent } from './single-store/single-store.component';

// Light Box
import { LightboxModule } from 'ngx-lightbox';

@NgModule({
  declarations: [
    IndexComponent,
    ElectronicsComponent,
    FashionStoreV2Component,
    SingleStoreComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    NgxUsefulSwiperModule,
    HomesRoutingModule,
    NgbRatingModule,
    NgxImageZoomModule,
    LightboxModule,
    NgbTooltipModule
  ]
})
export class HomesModule { }
