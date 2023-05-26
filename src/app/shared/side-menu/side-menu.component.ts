import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';
import { SideMenuItem } from './side-menu.model';
import { environment } from 'src/environments/environment';
import { CategoryService } from '../../services/category/category.service';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  @Output() changeCategory = new EventEmitter<string>();

  menuItems: SideMenuItem[] = [];
  smlFacebookURL = environment.smlFacebookURL
  smlPhoneNumber = environment.smlPhonenumber
  smlHotline = environment.smlHotline
  smlEmail = environment.smlEmail
  categories: any[] = []

  constructor(
    public _categoryService: CategoryService,
    public _cartService: CartService,
    private route: Router,
  ) {}

  ngOnInit() {
     // Menu Items
    this._categoryService.getCategories().subscribe((data: any) => {
      this.categories = data
    })
  }

  close() {
    document.getElementById('sideNav')?.classList.remove('show')
  }

  goToCat( id:any, label:any ) {
    console.log('label:', label)
    this.changeCategory.emit(label);
    this.route.navigate([`/grocery/product-catalog/${id}`]);
  }

}
