import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { BlogSidebarListService } from './blog-list-sidebar.service';
import { DecimalPipe } from '@angular/common';

import { Table } from './blog-list-sidebar.model';
import { tableData } from './data';

// Swiper Slider
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-blog-list-sidebar',
  templateUrl: './blog-list-sidebar.component.html',
  styleUrls: ['./blog-list-sidebar.component.scss'],
  providers: [BlogSidebarListService, DecimalPipe]
})

/**
 * Blog List Sidebar Component
 */
export class BlogListSidebarComponent implements OnInit {

  breadCrumbItems!: Array<{}>;
  tables$: Observable<Table[]>;
  total$: Observable<number>;

  constructor(public service: BlogSidebarListService) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
     this.breadCrumbItems = [
      { label: 'Home', link:'/fashion-store-v1' },
      { label: 'Blog', link:'/blogs/list-sidebar' },
      { label: 'List with sidebar', active: true, link:'/blogs/list-sidebar' }
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

}
