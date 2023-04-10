import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {NgbPaginationModule,NgbPopoverModule} from '@ng-bootstrap/ng-bootstrap';

// Swiper Slider
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

// Masonry
import { NgxMasonryModule } from 'ngx-masonry';

// Light Box
import { LightboxModule } from 'ngx-lightbox';

// Scroll To
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

// Component
import { SharedModule } from "../../shared/shared.module";
import { BlogsRoutingModule } from "./blogs-routing.module";
import { BlogListSidebarComponent } from './blog-list-sidebar/blog-list-sidebar.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogGridSidebarComponent } from './blog-grid-sidebar/blog-grid-sidebar.component';
import { BlogGridComponent } from './blog-grid/blog-grid.component';
import { BlogSingleComponent } from './blog-single/blog-single.component';
import { BlogSingleSidebarComponent } from './blog-single-sidebar/blog-single-sidebar.component';

@NgModule({
  declarations: [
    BlogListSidebarComponent,
    BlogListComponent,
    BlogGridSidebarComponent,
    BlogGridComponent,
    BlogSingleComponent,
    BlogSingleSidebarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbPopoverModule,
    SharedModule,
    BlogsRoutingModule,
    NgxUsefulSwiperModule,
    NgxMasonryModule,
    LightboxModule,
    ScrollToModule.forRoot()
  ]
})
export class BlogsModule { }
