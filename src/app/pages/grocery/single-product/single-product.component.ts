import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { DecimalPipe } from '@angular/common';

// Data Get
import { related } from './data';
import { cart } from '../checkout/data';
import { ActivatedRoute } from '@angular/router';
import { CatalogModel } from '../product-catalog/product-catalog.model';
import { ProductCatlogService } from '../product-catalog/product-catalog.service';
import { AuthService } from 'src/app/core/auth/auth.service';
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
  relatedproduct: any;
  // products: any;
  // products: ProductModel;
  products!: CatalogModel;
  qty: any = 1;

  constructor(
    private route: ActivatedRoute,
    public service: ProductCatlogService,
    public authService: AuthService,
  ) {

    // this.products = this.route.snapshot.params;
    let products = this.route.snapshot.params;
    this.products = this.service.deepCopy(products);
    // this.products["qty"] = "";
    // this.products.qty = "";

    console.log("this.products", this.products);
    // this.productimage =  this.products.image.split(',');
    this.productimage = this.products && this.products.image ? this.products.image.split(',') : null;
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
    // this.relatedproduct = related

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
    // this.products.qty = '1'
    // this.products.qty = this.qty;
    this.products.qty = this.service.deepCopy(this.qty);

    let product = this.service.deepCopy(this.products);
    // console.log("this.products", this.products)
    console.log("product", product)
    // cart.push(this.products)
    cart.push(product)

    console.log("cart", cart)

    this.authService.mycartChanged.next(true);
  }


}
