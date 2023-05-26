import { Component,Input,OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-grocery-breadcrumb',
  templateUrl: './grocery-breadcrumb.component.html',
  styleUrls: ['./grocery-breadcrumb.component.scss']
})
export class GroceryBreadcrumbComponent implements OnInit {
  @Input()
  breadcrumbItems!: Array<{
    link?: string;
    active?: boolean;
    label?: string;
  }>;

  Item!: Array<{
    label?: string;
  }>
  
  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  goToCat(link:any, label:any){
    let categoryId = link.split('/')
    categoryId = categoryId[categoryId.length-1]
    console.log('{label:label, id:categoryId}:', {label:label, id:categoryId})
    this.route.navigate([link, {label:label}]);

  }
}
