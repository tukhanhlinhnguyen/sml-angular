import { DecimalPipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PaginationService } from '../../../shared/pagination/pagination.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductModel } from 'src/app/core/model/product';
import { DOCUMENT } from '@angular/common';
// Data Get
// import { catalog } from './data';
// import { CatalogModel, ProductModel } from './product-catalog.model';
import { CatalogModel } from './product-catalog.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { CartService } from '../../../services/cart/cart.service';
import { InvoiceService } from '../invoice/invoice.service';
import { CookieService } from '../../../services/cookie/cookie.service';

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
    @Inject(DOCUMENT) private document: Document,
    public service: PaginationService,
    public authService: AuthService,
    public cartService: CartService,
    public router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private iService: InvoiceService,
    private cookieService: CookieService
    ) {
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

    //as client if they want to reorder
    if(!this.cookieService.getCookie("retake_order_asked")){
      let m: any =this.document.getElementById("retakeorder");
      m.click()
      //ok we display it once, let stop shoving it on client's face
      this.cookieService.setCookie("retake_order_asked","true",1)
    }
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

  /* -------------------------------------------------------------------------- */
  /*                                 RETAKE ORDER                               */
  /* -------------------------------------------------------------------------- */
  toggleModal(staticDataModal: any) {
    this.modalService.open(staticDataModal, { size: 'md', centered: true });
  }

  async retakeorder(){
    if(true){
      try{
      let productIdsList :any[] = []
      let productQtyList :number[] = []
      let invoice: any = await this.iService.getLatestInvoice();
      console.log('Retrieved invoice:', invoice);
      console.log('lines:', invoice.lines)
      if (invoice && invoice[0].lines) {
        invoice[0].lines.forEach((line:any) => {
          console.log("line", line)
          let productIds = line.id;
          let qty = Number(line.qty);
          productIdsList.push(productIds);
          productQtyList.push(qty);

          console.log("reussi")
        })
        console.log('productIdsList:', productIdsList)
        let productList:any = await this.iService.getProductFromIdsList(productIdsList);
        //we clear the cart
        localStorage.removeItem("cart");

        productList.forEach((p:ProductModel, index:number) => {
          this.cartService.addToCart(productQtyList[index], p);
        });
      }
      this.modalService.dismissAll();
      console.log('Products added to the basket successfully.');
      } catch (error) {
      console.log("error:", error);

    }
  }
}


}
