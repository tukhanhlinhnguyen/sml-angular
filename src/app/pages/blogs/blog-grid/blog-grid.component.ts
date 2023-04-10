import { Component, OnInit } from '@angular/core';
import { NgxMasonryOptions } from 'ngx-masonry';

import { Observable } from 'rxjs';
import { BlogGridService } from './blog-grid.service';
import { DecimalPipe } from '@angular/common';
import { Table } from './blog-grid.model';

// Swiper Slider
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-blog-grid',
  templateUrl: './blog-grid.component.html',
  styleUrls: ['./blog-grid.component.scss'],
  providers: [BlogGridService, DecimalPipe]
})

/**
 * Blog-Grid Component
 */
export class BlogGridComponent implements OnInit {

  breadCrumbItems!: Array<{}>;
  tables$: Observable<Table[]>;
  total$: Observable<number>;

  constructor(public service: BlogGridService) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
     this.breadCrumbItems = [
      { label: 'Home', link:'/fashion-store-v1' },
      { label: 'Blog', link:'/blogs/grid' },
      { label: 'Grid no sidebar', active: true, link:'/blogs/grid' }
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
        navigation: false,
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
