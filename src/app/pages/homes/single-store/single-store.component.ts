import { Component, OnInit } from '@angular/core';

// Light Box
import { Lightbox } from 'ngx-lightbox';
import { SwiperOptions } from 'swiper';

// Data Get
import { gallery, review, relatedproduct } from './data';

@Component({
  selector: 'app-single-store',
  templateUrl: './single-store.component.html',
  styleUrls: ['./single-store.component.scss']
})
export class SingleStoreComponent implements OnInit {

  productgallery: any;
  reviews: any;
  relatedproducts: any;
  imagecolor: any = '';

  constructor(private lightbox: Lightbox) {
  }

  ngOnInit(): void {
    this.productgallery = gallery
    this.reviews = review
    this.relatedproducts = relatedproduct
  }

  /**
* Open lightbox
*/
  openImage(index: any): void {
    this.lightbox.open(this.productgallery, index, { disableScrolling: true, centerVertically: true, showZoom: true });
  }

  /**
 * Swiper setting
 */
  config: SwiperOptions = {
    initialSlide: 0,
    slidesPerView: 1,
    spaceBetween: 25,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      575: {
        slidesPerView: 2,
      },
      850: {
        slidesPerView: 3,
      },
      1080: {
        slidesPerView: 4,
      }
    }
  };

  setcolor(ev: any) {
    var colortext = ev.target.dataset.bsLabel
    var target = ev.target.labels[0].dataset.bsTarget?.substring(1)
    var children = document.querySelectorAll('.radio-tab-pane');
    children.forEach(function (element: any, i: any) {
      var txt = element.getAttribute('id')
      element.classList.remove('active');
      if (txt == target) {
        (document.getElementById(colortext) as HTMLElement).innerHTML = ev.target.value
        element.classList.add('active');
      }
    })
  }

}
