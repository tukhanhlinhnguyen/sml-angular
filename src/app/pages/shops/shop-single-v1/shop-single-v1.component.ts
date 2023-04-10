import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Swiper Slider
import { SwiperOptions } from 'swiper';

// Data Get
import { StyleData, PopulerData } from './data';

@Component({
  selector: 'app-shop-single-v1',
  templateUrl: './shop-single-v1.component.html',
  styleUrls: ['./shop-single-v1.component.scss']
})

/**
 * ShopSingle V1 Component
 */
export class ShopSingleV1Component implements OnInit {

  // Review Form
  reviewForm!: UntypedFormGroup;
  submitted = false;
  styleDatas:any;
  populerDatas:any;

  constructor(private modalService: NgbModal, private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.styleDatas = StyleData;
    this.populerDatas = PopulerData;
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

  /**
   * Size Chart Modal
   * @param sizeChartModal scroll modal data
   */
   sizetModal(sizeChartModal: any) {
    this.modalService.open(sizeChartModal, { size: 'md', centered: true });
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

  // Image Click Filtering
  filterImg(e:any,image:any){
    document.querySelectorAll('.product-gallery-thumblist a').forEach(element => {
      element.classList.remove('active')      
    });
    const img:any = (document.querySelector('#first img') as HTMLImageElement);
    img.src = image; 
    e.target.closest('a').classList.add('active');
  }

}
