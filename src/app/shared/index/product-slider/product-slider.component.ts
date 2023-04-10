import { Component, OnInit, ViewChild } from '@angular/core';
// Swiper Slider
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-product-slider',
  templateUrl: './product-slider.component.html',
  styleUrls: ['./product-slider.component.scss']
})

/**
 * ProductSlider Component
 */
export class ProductSliderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
    // grid:{ rows: 2 },
    breakpoints:{
      0:{
        slidesPerView: 2, 
      },
      768:{
        slidesPerView: 2, 
      },
      1200:{
        slidesPerView: 3, 
      }
    }
  };
  
  /**
   * Product Data
   */
   productData = [
    {
      image:'assets/img/shop/catalog/53.jpg',
      category: 'Hoodies & Sweatshirts',
      name:'Mono Color Hooded Top',
      price: '21.99',
      discount: '',
      rating: 4.5,
    },
    {
      image:'assets/img/shop/catalog/56.jpg',
      category: 'Hoodies & Sweatshirts',
      name:'Printed Hooded Top',
      price: '25.99',
      discount: '',
      rating: 4,
    },
    {
      image:'assets/img/shop/catalog/52.jpg',
      category: 'Hoodies & Sweatshirts',
      name:'Printed Hooded Top',
      price: '25.99',
      discount: '',
      rating: 4.5,
    },
    {
      image:'assets/img/shop/catalog/55.jpg',
      category: 'Hoodies & Sweatshirts',
      name:'Block-colored Hooded Top',
      price: '24.99',
      discount: '',
      rating: 3.5,
    },
    {
      image:'assets/img/shop/catalog/22.jpg',
      category: 'Hoodies & Sweatshirts',
      name:'Block-colored Hooded Top',
      price: '24.99',
      discount: '',
      rating: 5,
    },
    {
      image:'assets/img/shop/catalog/57.jpg',
      category: 'Hoodies & Sweatshirts',
      name:'Block-colored Hooded Top',
      price: '23.99',
      discount: '',
      rating: 3,
    },
    {
      image:'assets/img/shop/catalog/20.jpg',
      category: 'Hoodies & Sweatshirts',
      name:'Block-colored Hooded Top',
      price: '24.99',
      discount: '',
      rating: 4,
    },
    {
      image:'assets/img/shop/catalog/51.jpg',
      category: 'Hoodies & Sweatshirts',
      name:'Mono Color Hooded Top',
      price: '21.99',
      discount: '',
      rating: 5,
    },
    {
      image:'assets/img/shop/catalog/21.jpg',
      category: 'Hoodies & Sweatshirts',
      name:'Mono Color Hooded Top',
      price: '26.99',
      discount: '',
      rating: 5,
    },
    {
      image:'assets/img/shop/catalog/24.jpg',
      category: 'Hoodies & Sweatshirts',
      name:'Mono Color Hooded Top',
      price: '24.99',
      discount: '',
      rating: 2.5,
    },
    {
      image:'assets/img/shop/catalog/23.jpg',
      category: 'Hoodies & Sweatshirts',
      name:'Block-colored Hooded Top',
      price: '17.99',
      discount: '24.99',
      rating: 3.5,
    },
    {
      image:'assets/img/shop/catalog/54.jpg',
      category: 'Hoodies & Sweatshirts',
      name:'Mono Color Hooded Top',
      price: '21.99',
      discount: '',
      rating: 4,
    }
  ]

}
