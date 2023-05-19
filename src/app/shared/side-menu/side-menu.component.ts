import { Component, OnInit } from '@angular/core';

import { MENU } from './side-menu';
import { SideMenuItem } from './side-menu.model';
import { environment } from 'src/environments/environment';
import { CategoryService } from '../../services/category/category.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  menuItems: SideMenuItem[] = [];
  smlFacebookURL = environment.smlFacebookURL
  smlPhoneNumber = environment.smlPhonenumber
  smlHotline = environment.smlHotline
  smlEmail = environment.smlEmail
  categories: any[] = []

  constructor(public _categoryService: CategoryService) {}

  ngOnInit() {
     // Menu Items
    this.menuItems = MENU;
    this._categoryService.getCategories().subscribe((data: any) => {
      this.categories = data
    })
  }

  close() {
    document.getElementById('sideNav')?.classList.remove('show')
    // document.querySelector('.nav-item')?.classList.remove('d-none')
  }

}
