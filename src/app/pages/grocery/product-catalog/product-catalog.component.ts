import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// Data Get
import { catalog } from './data';
import { CatalogModel } from './product-catalog.model';
import { ProductCatlogService } from './product-catalog.service';
import { cart } from '../checkout/data';
import { Router } from '@angular/router';

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
  total: Observable<number>;

  constructor(public service: ProductCatlogService,
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

    //Fetch Data
    setTimeout(() => {
      this.CatelogList.subscribe(x => {
        this.catalogs = Object.assign([], x);
      });
      document.getElementById('elmLoader')?.classList.add('d-none')
    }, 1200)

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
      this.service.products = catalog.filter((element: any) => {
        return element.type == 'popular'
      })
    }
    if (ev.nextId == 2) {
      this.service.products = catalog.filter((element: any) => {
        return element.type == 'Cheap'
      })
    }
    if (ev.nextId == 3) {
      this.service.products = catalog.filter((element: any) => {
        return element.type == 'Expensive'
      })
    }

  }

  // Go To Detail Page
  gotodetail(id: any) {
    this.router.navigate(['/grocery/single-product', this.catalogs[id]])
  }

  // Add To Cart
  addtocart(id: any) {
    cart.push(this.catalogs[id])
  }

}
