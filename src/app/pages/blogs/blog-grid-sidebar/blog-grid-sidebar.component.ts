import { Component, OnInit } from '@angular/core';
import { NgxMasonryOptions } from 'ngx-masonry';

import { Observable } from 'rxjs';
import { BlogSidebarGridService } from './blog-grid-sidebar.service';
import { DecimalPipe } from '@angular/common';

import { Table } from './blog-grid-sidebar.model';

// Swiper Slider
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-blog-grid-sidebar',
  templateUrl: './blog-grid-sidebar.component.html',
  styleUrls: ['./blog-grid-sidebar.component.scss'],
  providers: [BlogSidebarGridService, DecimalPipe]
})

/**
 * Blog-Grid-Sidebar Component
 */
export class BlogGridSidebarComponent implements OnInit {

  breadCrumbItems!: Array<{}>;
  tables$: Observable<Table[]>;
  total$: Observable<number>;

  constructor(public service: BlogSidebarGridService) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'Home', link:'/fashion-store-v1' },
      { label: 'Blog', link:'/blogs/grid-sidebar' },
      { label: 'Grid no sidebar', active: true, link:'/blogs/grid-sidebar' }
    ];
  }

  /**
  * Swiper Style setting
  */
   public Style: SwiperOptions = {
    pagination: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 30,
    loop:true,
    breakpoints:{
      499:{
        slidesPerView: 1, 
      },
      700:{
        slidesPerView: 2, 
      }
    }
  };

  /***
   * Masonry Option Function
   */
  public myOptions: NgxMasonryOptions = {
    horizontalOrder: true
  };

}
