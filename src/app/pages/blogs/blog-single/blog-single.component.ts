import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
// Light Box
import { Lightbox } from 'ngx-lightbox';
// Swiper Slider
import { SwiperOptions } from 'swiper';

// Data Get
import { blogData } from './data';


@Component({
  selector: 'app-blog-single',
  templateUrl: './blog-single.component.html',
  styleUrls: ['./blog-single.component.scss']
})

/**
 * Blog-Single Component
 */
export class BlogSingleComponent implements OnInit {

  // Comment Form
  commentForm!: UntypedFormGroup;
  submitted = false;
  blogDatas:any;
  breadCrumbItems!: Array<{}>;
  _album: Array<any> = [];

  constructor(private lightbox: Lightbox, private formBuilder: UntypedFormBuilder) { 
    for (let i = 0; i <= 3; i++) {
      const src = 'assets/img/blog/single/th0' + i + '.jpg';
      const caption = 'Image ' + i + ' caption here';
      const thumb = 'assets/img/blog/single/th0' + i + '.jpg';
      const album = {
         src: src,
         caption: caption,
         thumb: thumb
      };
      this._album.push(album);
    }
  }

  ngOnInit(): void {
    this.blogDatas = blogData;
    /**
    * BreadCrumb
    */
     this.breadCrumbItems = [
      { label: 'Home', link:'/fashion-store-v1' },
      { label: 'Blog', link:'/blogs/single' },
      { label: 'Single post', active: true, link:'/blogs/single' }
    ];

    /**
     * Form Validatyion
     */
     this.commentForm = this.formBuilder.group({
      message: ['', [Validators.required]],
    });
  }

  /**
   * Open lightbox
  */
  openImage(index: any): void {
    this.lightbox.open(this._album, index, {disableScrolling:true});
  }

  // convenience getter for easy access to form fields
  get form() { return this.commentForm.controls; }

  /**
   * Form submit
   */
   onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.commentForm.invalid) {
      return;
    }
  }

  /**
  * Swiper Style setting
  */
   public Style: SwiperOptions = {
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 30,
    loop:true,
    breakpoints:{
      0:{
        navigation: false,
        slidesPerView: 1, 
      },
      500:{
        slidesPerView: 2, 
      },
      900:{
        slidesPerView: 3, 
      }
    }
  };

  toggleWithGreeting(popover:any, greeting: string, language: string) {
		if (popover.isOpen()) {
			popover.close();
		} else {
			popover.open({ greeting, language });
		}
	}

}
