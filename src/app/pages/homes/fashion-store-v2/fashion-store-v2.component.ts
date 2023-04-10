import { Component, OnInit } from '@angular/core';

// Data Get
import { productData, mensproduct, kidsproduct } from './data';
import { bestseller, newarrival } from '../electronics/data';

// Swiper Slider
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-fashion-store-v2',
  templateUrl: './fashion-store-v2.component.html',
  styleUrls: ['./fashion-store-v2.component.scss']
})
export class FashionStoreV2Component implements OnInit {

  productData: any;
  mensproduct: any;
  kidsproduct: any;
  bestsellers: any;
  newarrivals: any;

  constructor() { }

  ngOnInit(): void {
    // Fetch Data
    this.productData = productData;
    this.mensproduct = mensproduct;
    this.kidsproduct = kidsproduct;
    this.bestsellers = bestseller;
    this.newarrivals = newarrival
  }


  /**
  * Swiper Coverflow setting
  */
  Coverflow: SwiperOptions = {
    pagination: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    effect: 'fade',
  };

  /**
 * Swiper Coverflow setting
 */
  Product: SwiperOptions = {
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 30,
    breakpoints: {
      320: {
        slidesPerView: 3,
        slidesPerColumn: 2,
        slidesPerColumnFill: "column",
      },
      575: {
        slidesPerView: 3,
        slidesPerColumn: 2,
        slidesPerColumnFill: "column",
      },
      1080: {
        slidesPerView: 3,
        slidesPerColumn: 2,
        slidesPerColumnFill: "row",
      },
    },
  };

}
