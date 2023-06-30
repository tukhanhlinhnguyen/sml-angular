import { DecimalPipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PaginationService } from '../../../shared/pagination/pagination.service';

// Data Get
// import { catalog } from './data';
// import { CatalogModel, ProductModel } from './product-catalog.model';
import { CatalogModel } from './product-catalog.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { CartService } from '../../../services/cart/cart.service';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.scss'],
  providers: [PaginationService, DecimalPipe]
})
export class ProductCatalogComponent implements OnInit {
  @Output() changePageID = new EventEmitter();
  breadCrumbItems: any;
  catalogs: any;
  loading: boolean = false;
  title:string;
  categoryId:any;
  pageId:any;

  // Table data
  CatelogList!: Observable<CatalogModel[]>;
  // ProductList!: ProductModel[];
  ProductList!: CatalogModel[];
  total: Observable<number>;

  constructor(
    public service: PaginationService,
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
    this.pageId=this.service.page

    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'Home', link: '/grocery' },
      { label: 'Product catalog', active: true, link: `/grocery/product-catalog/all/` }
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



  gotoPageID(id:any){
    this.changePageID.emit({id});
    //this.router.navigate([`/grocery/product-catalog/all/${id}`])
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
    this.cartService.addToCart(1, this.catalogs[id])
  }

  async getProduct() {
    this.catalogs =[];
    this.loading=true;
    try {
      let res: any = await this.service.get_products();
      console.log('res:', res)
      if (res) {
        //this.catalogs=res
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
    }
  }

  updateCategoryTitle(event:any){
    this.title= event.label ? event.label : this.title
    this.categoryId=event.id
  }

  selectPage(page: string) {
		this.service.page = parseInt(page, 10) || 1;
	}

}
