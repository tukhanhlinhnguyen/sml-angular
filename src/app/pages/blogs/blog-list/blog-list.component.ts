import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { BlogListService } from './blog-list.service';
import { DecimalPipe } from '@angular/common';

import { Table } from './blog-list.model';
import { tableData } from './data';

// Swiper Slider
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
  providers: [BlogListService, DecimalPipe]
})

/**
 * Blog List Component
 */
export class BlogListComponent implements OnInit {

  breadCrumbItems!: Array<{}>;
  tables$: Observable<Table[]>;
  total$: Observable<number>;

  constructor(public service: BlogListService) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
     this.breadCrumbItems = [
      { label: 'Home', link:'/fashion-store-v1' },
      { label: 'Blog', link:'/blogs/list' },
      { label: 'List with sidebar', active: true, link:'/blogs/list' }
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
