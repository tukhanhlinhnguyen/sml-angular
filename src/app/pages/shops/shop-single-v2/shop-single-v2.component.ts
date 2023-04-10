import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

// Data Get
import { PopularData, CheaperData } from './data';

// Swiper Slider
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-shop-single-v2',
  templateUrl: './shop-single-v2.component.html',
  styleUrls: ['./shop-single-v2.component.scss']
})

/**
 * Shop Single V2 Component
 */
export class ShopSingleV2Component implements OnInit {

  reviewForm!: UntypedFormGroup;
  submitted = false;
  // Data Get
  PopularDatas:any;

  constructor(private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.PopularDatas = PopularData;
    /**
     * Form Validatyion
     */
     this.reviewForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      rating: ['', [Validators.required]],
      review: ['', [Validators.required]],
    });
  }

  // Image Click Filtering
  filterImg(e:any,image:any){
    document.querySelectorAll('.product-gallery-thumblist a').forEach(element => {
      element.classList.remove('active')      
    });
    const img:any = (document.querySelector('#first img') as HTMLImageElement);
    img.src = image; 
    e.target.closest('a').classList.add('active');
  }

  // convenience getter for easy access to form fields
  get form() { return this.reviewForm.controls; }

  /**
  * Form submit
  */
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.reviewForm.invalid) {
      return;
    }
  }

  /**
  * Swiper Popular setting
  */
   public Popular: SwiperOptions = {
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
      500:{
        slidesPerView: 2, 
      },
      767:{
        slidesPerView: 3, 
      },
      1200:{
        slidesPerView: 4, 
      }
    }
  };

  /**
  * Swiper Cheaper setting
  */
   public Cheaper: SwiperOptions = {
    slidesPerView: 1,
    pagination: true,
    navigation: false,
    loop:true,
  };

}
