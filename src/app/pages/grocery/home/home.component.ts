import { Component, OnInit } from '@angular/core';

// Swiper Slider
import { SwiperOptions } from 'swiper';

// Data Get
import { discout, Bestsellers, review } from './data';
import { cart } from '../checkout/data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

/**
 * Home Component
 */
export class HomeComponent implements OnInit {

  discountedproduct: any;
  bestseller: any;
  reviews: any;

  constructor(public router: Router) { }

  ngOnInit(): void {

    // When the user clicks on the button, scroll to the top of the document
    document.documentElement.scrollTop = 0;

    // Fetch Data
    this.discountedproduct = discout
    this.bestseller = Bestsellers
    this.reviews = review

    // set decimal point to small
    setTimeout(() => {
      document.querySelectorAll(".product-price").forEach((e) => {
        let txt = e.innerHTML.split(".")
        e.innerHTML = txt[0] + ".<small>" + txt[1] + "</small>"
      })
    }, 0);
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
 * Swiper Discount Product setting
 */
  Discount: SwiperOptions = {
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 15,
    breakpoints: {
      575: {
        slidesPerView: 1,
      },
      1080: {
        slidesPerView: 5,
      },
    },
  };

  /**
 * Swiper Review setting
 */
  Review: SwiperOptions = {
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      575: {
        slidesPerView: 1,
      },
      1080: {
        slidesPerView: 4,
      },
    },
  };

  // Go To Detail Page
  gotodetail(id: any) {
    this.router.navigate(['/single-product',this.discountedproduct[id]])
  }

  gotosellerdetail(id: any) {
    this.router.navigate(['/single-product',this.bestseller[id]])
  }


  // Add To Cart
  addtocart(id: any) {
    cart.push(this.discountedproduct[id])
  }

}
