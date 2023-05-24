import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Data Get
// import { catalog } from './data';
// import { CatalogModel, ProductModel } from './product-catalog.model';
import { CatalogModel } from './product-catalog.model';
import { ProductCatlogService } from './product-catalog.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { CartService } from '../../../services/cart/cart.service';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.scss'],
  providers: [ProductCatlogService, DecimalPipe]
})
export class ProductCatalogComponent implements OnInit {

  breadCrumbItems: any;
  catalogs: any;

  // Table data
  CatelogList!: Observable<CatalogModel[]>;
  // ProductList!: ProductModel[];
  ProductList!: CatalogModel[];
  total: Observable<number>;

  constructor(
    public service: ProductCatlogService,
    public authService: AuthService,
    public cartService: CartService,
    public router: Router) {
    this.CatelogList = service.countries$;
    this.total = service.total$;
  }

  ngOnInit(): void {

    // When the user clicks on the button, scroll to the top of the document
    document.documentElement.scrollTop = 0;

    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'Home', link: '/grocery' },
      { label: 'Product catalog', active: true, link: '/grocery/product-catalog' }
    ];
    
    this.getProduct();

    // set decimal point to small
    setTimeout(() => {
      document.querySelectorAll(".product-price").forEach((e) => {
        let txt = e.innerHTML.split(".")
        e.innerHTML = txt[0] + ".<small>" + txt[1] + "</small>"
      })
    }, 2000);
  }

  // Sorting

  sortproduct(ev: any) {
    if (ev.nextId == 1) {
      // this.service.products = catalog.filter((element: any) => {
      this.service.products = this.ProductList.filter((element: any) => {
        return element.type == 'popular'
      })
    }
    if (ev.nextId == 2) {
      // this.service.products = catalog.filter((element: any) => {
      this.service.products = this.ProductList.filter((element: any) => {
        return element.type == 'Cheap'
      })
    }
    if (ev.nextId == 3) {
      // this.service.products = catalog.filter((element: any) => {
      this.service.products = this.ProductList.filter((element: any) => {
        return element.type == 'Expensive'
      })
    }

  }

  // Go To Detail Page
  gotodetail(id: any) {
    this.router.navigate(['/grocery/single-product', {id:id}])
  }

  // Add To Cart
  addtocart(id: any) {
    this.catalogs[id].qty = 1;

    let product = this.service.deepCopy(this.catalogs[id]);
    // console.log("this.products", this.products)
    console.log("product", product)

    // cart.push(this.catalogs[id])
    this.cartService.addToCart(product)

    this.authService.mycartChanged.next(true);
  }

  async getProduct() {

    try {
      let res: any = await this.service.get_products();
      console.log("res", res);
      if (res) {
        this.service.productChanged.next(this.ProductList);
        this.ProductList = res || [];
        setTimeout(() => {
          this.CatelogList.subscribe(x => {
            this.catalogs = Object.assign([], x);
            this.service.productChanged.next(this.ProductList);

            // console.log("this.catalogs", this.catalogs);
          });
          document.getElementById('elmLoader')?.classList.add('d-none')
        }, 1200)
        // this.catalogs = Object.assign([], res);
        // this.service.productChanged.next(this.ProductList);

        // document.getElementById('elmLoader')?.classList.add('d-none')
      }

    } catch (error) {
      console.log("error", error);

    }

    // this.service.get_products().subscribe((res: any[]) => {
    //   // this.families = res;
    // });
  }

}
