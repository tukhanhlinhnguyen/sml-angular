import { Component, OnInit, ViewChild } from '@angular/core';

// Swiper Slider
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})

/**
 * Index Component
 */
export class IndexComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

  /**
  * Swiper Coverflow setting
  */
  Coverflow: SwiperOptions = {
    pagination: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    effect:'fade',
  };

}
