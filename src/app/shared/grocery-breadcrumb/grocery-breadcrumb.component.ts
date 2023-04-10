import { Component,Input,OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
  }
}
