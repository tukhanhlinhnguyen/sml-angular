import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

// Data Get
// import { catalog } from './data';
// import { CatalogModel, ProductModel } from './product-catalog.model';
import { CatalogModel } from '../product-catalog/product-catalog.model';
import { ProductCatlogService } from '../product-catalog/product-catalog.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { CartService } from '../../../services/cart/cart.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
  providers: [ProductCatlogService, DecimalPipe]
})
export class SearchPageComponent implements OnInit {

  breadCrumbItems: any;
  catalogs: any;
  loading: boolean = false;
  title:string;
  categoryId:any;

  // Table data
  CatelogList!: Observable<CatalogModel[]>;
  // ProductList!: ProductModel[];
  ProductList!: CatalogModel[];
  total: Observable<number>;

  constructor(
    public service: ProductCatlogService,
    public authService: AuthService,
    public cartService: CartService,
    public router: Router,
    private route: ActivatedRoute) {
    this.CatelogList = service.products$;
    this.total = service.total$;
  }

  ngOnInit(): void {

    // When the user clicks on the button, scroll to the top of the document
    document.documentElement.scrollTop = 0;

    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      // { label: 'Home', link: '/grocery' },
      // { label: 'Product catalog', active: true, link: '/grocery/product-catalog/all' }
    ];

    this.route.params.subscribe(routeParams => {
      this.title = routeParams.label ? routeParams.label : this.title
      this.getProduct();
    });

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
    this.router.navigate(['/grocery/single-product', {id:id, categoryId:this.categoryId, categoryLabel:this.title}])
  }

 // Add To Cart
 addtocart(id: any) {
  this.catalogs[id].qty = 1;
  this.cartService.addToCart(id, this.catalogs[id])
}

  async getProduct() {
    this.catalogs =[];
    this.loading=true;
    try {
      let res: any = await this.service.searchProducts();
      if (res) {
        this.service.productChanged.next(this.ProductList);
        this.ProductList = res || [];
        this.CatelogList.subscribe(x => {
          this.catalogs = Object.assign([], x);
          this.service.productChanged.next(this.ProductList);
          setTimeout(() => {
            this.loading = false
          }, 500);
          // console.log("this.catalogs", this.catalogs);
        });
      }

    } catch (error) {
      console.log("error", error);
      this.loading = false
      console.log('this.catalogs:', this.catalogs)
    }
  }

  updateCategoryTitle(event:any){
    this.title= event.label ? event.label : this.title
    this.categoryId=event.id
  }

}
