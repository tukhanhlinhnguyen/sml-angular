import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

// Data Get
// import { catalog } from './data';
// import { CatalogModel, ProductModel } from './invoice.model';
import { CatalogModel } from './invoice.model';
import { InvoiceService } from './invoice.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { CartService } from '../../../services/cart/cart.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
  providers: [InvoiceService, DecimalPipe]
})
export class InvoiceComponent implements OnInit {

  breadCrumbItems: any;
  invoices: any;
  loading: boolean = false;
  title:string;
  categoryId:any;

  // Table data
  CatelogList!: Observable<CatalogModel[]>;
  // ProductList!: ProductModel[];
  ProductList!: CatalogModel[];
  total: Observable<number>;

  constructor(
    public service: InvoiceService,
    public authService: AuthService,
    public cartService: CartService,
    public router: Router,
    private route: ActivatedRoute) {
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
      { label: 'Product catalog', active: true, link: '/grocery/invoice/all' }
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
  downloadInvoice(url: any) {
    let trimedURL = url.replace('facture/','')
    this.service.downloadInvoice(trimedURL).then(fee=>{
      fee.subscribe((data:any)=>{
        var binaryData = [];
        const linkSource = `data:application/pdf;base64,${data.content}`;

        let a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = linkSource;
        a.download = data.filename;
        a.click();
        window.URL.revokeObjectURL(linkSource);
        a.remove();
      })
    })
    
  }

  getPDFName(url: any){
    let trimedURL = url.split('/')
    return trimedURL[trimedURL.length - 1]
  }

  async getProduct() {
    this.invoices =[];
    this.loading=true;
    try {
      let res: any = await this.service.getInvoice();
      console.log('res:', res)
      if (res) {
        this.invoices=res
        this.loading = false
        // this.service.productChanged.next(this.ProductList);
        // this.ProductList = res || [];
        // this.CatelogList.subscribe(x => {
        //   this.invoices = Object.assign([], x);
        //   this.service.productChanged.next(this.ProductList);
        //   this.loading = false
        //   // console.log("this.invoices", this.invoices);
        // });
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

}
