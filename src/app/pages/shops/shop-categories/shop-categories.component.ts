import { Component, OnInit } from '@angular/core';

// Data Get
import { CategoryData } from './data';

@Component({
  selector: 'app-shop-categories',
  templateUrl: './shop-categories.component.html',
  styleUrls: ['./shop-categories.component.scss']
})

/**
 * Shop Categories Component
 */
export class ShopCategoriesComponent implements OnInit {

  breadCrumbItems!: Array<{}>;
  categoryList:any;
  
  constructor() { }

  ngOnInit(): void {
    this.categoryList = CategoryData;

    /**
    * BreadCrumb
    */
     this.breadCrumbItems = [
      { label: 'Home', link:'/fashion-store-v1' },
      { label: 'Shop', link:'/shop/categories' },
      { label: 'Categories', active: true, link:'/shop/categories' }
    ];
  }

}
