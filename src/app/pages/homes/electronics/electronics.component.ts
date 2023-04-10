import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

// Swiper Slider
import { SwiperOptions } from 'swiper';

// Data Get
import { slider, trending, brands, bestseller, toprate, newarrival, youtube } from './data';

@Component({
  selector: 'app-electronics',
  templateUrl: './electronics.component.html',
  styleUrls: ['./electronics.component.scss']
})

// Electronics Component
export class ElectronicsComponent implements OnInit {

  sliders: any;
  trendingproduct: any;
  brands: any;
  auctiontime: any;
  bestseller: any;
  toprate: any;
  newarrival: any;
  youtube: any;

  // set the current year
  year: number = new Date().getFullYear();
  private _diff?: any;
  _days?: number;
  _hours?: number;
  _minutes?: number;
  _seconds?: number;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {

    // Fetch Data
    this.sliders = slider
    this.trendingproduct = trending
    this.brands = brands
    this.bestseller = bestseller
    this.toprate = toprate
    this.newarrival = newarrival
    this.youtube = youtube

    // Date Set
    this.auctiontime = "07/01/2023 07:00:00 PM";

  }

  ngAfterViewInit(): void {
    /**
        * Count date set
        */
    interval(1000).pipe(map((x) => {
      this._diff = Date.parse(this.auctiontime) - Date.parse(new Date().toString());
    })).subscribe((x) => {
      this._days = this.getDays(this._diff);
      this._hours = this.getHours(this._diff);
      this._minutes = this.getMinutes(this._diff);
      this._seconds = this.getSeconds(this._diff);
    });
  }

  /**
   * Swiper setting
   */
  config: SwiperOptions = {
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      575: {
        slidesPerView: 1,
      },
      1080: {
        slidesPerView: 1,
      },
    },
  };

  /**
  * Brand Swiper setting
  */
  Brand: SwiperOptions = {
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    loop: true,
    breakpoints: {
      575: {
        slidesPerView: 1,
      },
      1080: {
        slidesPerView: 4,
      },
    },
  };

  /**
 * Youtube Swiper setting
 */
  Youtube: SwiperOptions = {
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    loop: true,
    breakpoints: {
      575: {
        slidesPerView: 1,
      },
      1080: {
        slidesPerView: 3,
      },
    },
  };

  /**
   * Open center modal and product data get
   * @param centerDataModal center modal data
   */
  product_img: any;
  singleData: any;
  centerModal(centerDataModal: any, id: any) {
    this.singleData = this.trendingproduct[id];
    this.product_img = this.singleData.image[0];
    this.modalService.open(centerDataModal, { size: 'xl', centered: true });
  }

  // Image Click Filtering
  filterImg(id: any) {
    this.product_img = this.singleData.image[id]
  }

  /**
  * Day Set
  */
  getDays(t: number) {
    return Math.floor(t / (1000 * 60 * 60 * 24));
  }

  /**
   * Hours Set
   */
  getHours(t: number) {
    return Math.floor((t / (1000 * 60 * 60)) % 24);
  }

  /**
   * Minutes set
   */
  getMinutes(t: number) {
    return Math.floor((t / 1000 / 60) % 60);
  }

  /**
   * Secound set
   */
  getSeconds(t: number) {
    return Math.floor((t / 1000) % 60);
  }

}
