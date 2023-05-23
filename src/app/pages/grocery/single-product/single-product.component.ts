import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { DecimalPipe } from '@angular/common';

// Data Get
import { related } from './data';
import { ActivatedRoute } from '@angular/router';
import { ProductCatlogService } from '../product-catalog/product-catalog.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductService } from 'src/app/services/product/product.servie';

import { ProductModel } from '../../../models/product';


// import { ProductModel } from '../product-catalog/product-catalog.model';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss'],
  providers: [ProductCatlogService, DecimalPipe]
})
export class SingleProductComponent implements OnInit {

  breadCrumbItems: any;
  productimage: any;
  preview: any;
  // product: any;
  // product: ProductModel;
  product: ProductModel;
  qty: any = 1;

  constructor(
    private route: ActivatedRoute,
    public service: ProductCatlogService,
    public authService: AuthService,
    public cartService: CartService,
    public productService: ProductService,
  ) {

    // this.product = this.route.snapshot.params;
    this.productService.getProductById(this.route.snapshot.params['id'])
        .subscribe((data)=>{
        console.log('data:', data)
			if(data) this.product = data
        });

    // this.productimage =  this.product.image.split(',');
    console.log("this.productimage", this.productimage);
    // this.preview = this.productimage[0]
    this.preview = this.productimage && this.productimage.length > 0 ? this.productimage[0] : null;
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
  addcart() {
    this.product.qty = this.service.deepCopy(this.qty);
    console.log('this.product:', this.product)

    this.cartService.addToCart(this.product)

    // this.authService.mycartChanged.next(true);
  }


}
