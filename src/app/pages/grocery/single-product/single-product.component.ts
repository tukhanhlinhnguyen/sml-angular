import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { DecimalPipe } from '@angular/common';

// Data Get
import { ActivatedRoute } from '@angular/router';
import { ProductCatlogService } from '../product-catalog/product-catalog.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductService } from 'src/app/services/product/product.servie';
import { ProductModel } from '../../../models/product';


@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss'],
  providers: [ProductCatlogService, DecimalPipe]
})
export class SingleProductComponent implements OnInit {

  breadCrumbItems: any=[];
  productimage: any;
  preview: any;
  // product: any;
  // product: ProductModel;
  product: ProductModel;
  qty: number = 1;
  categoryLabel: any;
  categoryId: any;

  constructor(
    private route: ActivatedRoute,
    public service: ProductCatlogService,
    public authService: AuthService,
    public cartService: CartService,
    public productService: ProductService,
  ) {
  }

  ngOnInit(): void {

    // When the user clicks on the button, scroll to the top of the document
    document.documentElement.scrollTop = 0;

    // this.product = this.route.snapshot.params;
    this.productService.getProductById(this.route.snapshot.params['id']).subscribe((data)=>{
      console.log('data:', data)
        if(data) this.product = data
      });
  
      // get cat product by ID
      // this.productService.getProductCatById(this.route.snapshot.params['id']).subscribe((data)=>{
      //   if(data) {
      //     this.product = data
      //   }
      // });
  
      // this.productimage =  this.product.image.split(',');
      console.log("this.productimage", this.productimage);
      // this.preview = this.productimage[0]
      this.preview = this.productimage && this.productimage.length > 0 ? this.productimage[0] : null;

    this.route.params.subscribe(routeParams => {
      /**
      * BreadCrumb
      */
      this.breadCrumbItems = [
        { label: 'Home', link: '/grocery' },
        { label: 'Product catalog', active: true, link: '/grocery/product-catalog/all' },
        { label: this.categoryLabel, active: true, link: '/grocery/product-catalog/' + this.categoryId },
      ];
    });

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
    console.log('this.qty:', (this.qty))
    this.cartService.addToCart(this.qty, this.product)
  }
}
