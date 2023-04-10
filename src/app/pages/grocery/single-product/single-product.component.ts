import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';

// Data Get
import { related } from './data';
import { cart } from '../checkout/data';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {

  breadCrumbItems: any;
  productimage: any;
  preview: any;
  relatedproduct: any;
  products: any;
  qty: any = 1;

  constructor(private route: ActivatedRoute) {

    this.products = this.route.snapshot.params;
    this.productimage = this.products.image.split(',');
    this.preview = this.productimage[0]
  }

  ngOnInit(): void {

    // When the user clicks on the button, scroll to the top of the document
    document.documentElement.scrollTop = 0;

    /**
* BreadCrumb
*/
    this.breadCrumbItems = [
      { label: 'Home', link: '/grocery' },
      { label: 'Product catalog', active: true, link: '/grocery/product-catalog' },
      { label: 'Single product', active: true, link: '/grocery/single-product' }
    ];

    // Fetch Data
    this.relatedproduct = related

    // set decimal point to small
    setTimeout(() => {
      document.querySelectorAll(".product-price").forEach((e) => {
        let txt = e.innerHTML.split(".")
        e.innerHTML = txt[0] + ".<small>" + txt[1] + "</small>"
      })
    }, 0);
  }

  // Show Image Preview
  imagePreview(id: any, ev: any) {
    document.querySelectorAll('.product-gallery-thumblist-item').forEach(element => {
      element.classList.remove('active')
    });
    document.getElementById(id)?.classList.add('active')
    this.preview = this.productimage[id]
  }

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

  // Add To Cart
  addtocart(id: any) {
    cart.push(this.relatedproduct[id])
  }

  addcart() {
    this.products.qty = '1'
    cart.push(this.products)
  }

 
}
