import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCarouselModule, NgbDropdownModule, NgbNavModule, NgbRatingModule, NgbCollapseModule,NgbTooltipModule, NgbAccordionModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxImageZoomModule } from 'ngx-image-zoom';


// Language
import { LanguageService } from '../services/language/language.service';
import { TranslateModule } from '@ngx-translate/core';

// Swiper Slider
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

// Component
import { TrendingComponent } from './index/trending/trending.component';
import { ProductSliderComponent } from './index/product-slider/product-slider.component';
import { BrandLogosComponent } from './index/brand-logos/brand-logos.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { NavbarLevel1LightComponent } from './navbar/navbar-level1-light/navbar-level1-light.component';
import { NavbarLevel1DarkComponent } from './navbar/navbar-level1-dark/navbar-level1-dark.component';
import { NavbarLevel2LightComponent } from './navbar/navbar-level2-light/navbar-level2-light.component';
import { NavbarLevel2DarkComponent } from './navbar/navbar-level2-dark/navbar-level2-dark.component';
import { NavbarLevel3DarkComponent } from './navbar/navbar-level3-dark/navbar-level3-dark.component';
import { MenuComponent } from './menu/menu.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { GroceryBreadcrumbComponent } from './grocery-breadcrumb/grocery-breadcrumb.component';
import { GroceryHeaderComponent } from './grocery-header/grocery-header.component';
import { GroceryFooterComponent } from './grocery-footer/grocery-footer.component';
import { HomeButtonComponent } from './home-button/home-button.component';
import { PaginationComponent } from './pagination/pagination.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ZoomImageComponent } from './zoom-image/zoom-image.component';

@NgModule({
  declarations: [
    TrendingComponent,
    ProductSliderComponent,
    BrandLogosComponent,
    FooterComponent,
    BreadcrumbsComponent,
    NavbarLevel1LightComponent,
    NavbarLevel1DarkComponent,
    NavbarLevel2LightComponent,
    NavbarLevel2DarkComponent,
    NavbarLevel3DarkComponent,
    MenuComponent,
    SideMenuComponent,
    GroceryBreadcrumbComponent,
    GroceryHeaderComponent,
    GroceryFooterComponent,
    HomeButtonComponent,
    PaginationComponent,
    ZoomImageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbCarouselModule, 
    NgbDropdownModule,
    NgbNavModule,
    NgbRatingModule,
    NgbCollapseModule,
    NgbTooltipModule,
    NgxUsefulSwiperModule,
    ScrollToModule.forRoot(),
    TranslateModule,
    NgbAccordionModule,
    NgbPaginationModule,
    NgxImageZoomModule
  ],
  providers: [
    LanguageService,
  ],
  exports:[BreadcrumbsComponent,TrendingComponent,ProductSliderComponent,BrandLogosComponent,FooterComponent,NavbarLevel1LightComponent,NavbarLevel1DarkComponent,
    NavbarLevel2LightComponent, NavbarLevel2DarkComponent, NavbarLevel3DarkComponent, SideMenuComponent, GroceryBreadcrumbComponent,GroceryFooterComponent,
    GroceryHeaderComponent, HomeButtonComponent, PaginationComponent, ZoomImageComponent]
})
export class SharedModule { }
