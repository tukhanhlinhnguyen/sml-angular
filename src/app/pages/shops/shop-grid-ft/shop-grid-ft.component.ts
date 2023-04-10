import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Range Slider
import { Options } from '@angular-slider/ngx-slider';

// Data Get
import { ShopGridLsdata } from './data';
import { CartData } from '../shop-cart/data';

@Component({
  selector: 'app-shop-grid-ft',
  templateUrl: './shop-grid-ft.component.html',
  styleUrls: ['./shop-grid-ft.component.scss']
})

/**
 * Shop Grid Filters on top Component
 */
export class ShopGridFtComponent implements OnInit {

 // Table data
 content?: any;
 Gridlists?: any;
 total: any;
 public isCollapsed = true;

 // Custom Data
 page:any = 1;
 pageSize:any = 8;
 startIndex:any = 0;
 endIndex:any = 8;
 totalRecords:any = 0;
 AllGridlists: any;
 AllGridSize:any;
 AllGridColor:any;

 constructor(private modalService: NgbModal) {
   // this.gridLsList = service.gridLsList$;
 }

 ngOnInit(): void {
  
   this.totalRecords = ShopGridLsdata.length;
   this.startIndex = (this.page - 1) * this.pageSize + 1;
   this.endIndex = (this.page - 1) * this.pageSize + this.pageSize;
   if (this.endIndex > this.totalRecords) {
     this.endIndex = this.totalRecords;
   }
   this.Gridlists = ShopGridLsdata.slice(this.startIndex - 1, this.endIndex);
   this.total = this.totalRecords;
   this.AllGridlists =  Object.assign([], this.Gridlists); 
   this.AllGridSize =  Object.assign([]); 
   this.AllGridColor =  Object.assign([]); 
   document.querySelector('.data-blank')?.classList.add('d-none')

   this.refreshCountries()
 }

 // Pagination data get
 loadPage(page: number) {
   this.startIndex = (this.page - 1) * this.pageSize + 1;
   this.endIndex = (this.page - 1) * this.pageSize + this.pageSize;
   if (this.endIndex > this.totalRecords) {
     this.endIndex = this.totalRecords;
   }
   this.Gridlists = ShopGridLsdata.slice(this.startIndex - 1, this.endIndex);
 }

 /**
  * Open center modal and product data get
  * @param centerDataModal center modal data
  */
  product_img:any;
  singleData:any;
  centerModal(centerDataModal: any,id:any) {
   this.singleData = this.Gridlists[id];
   this.product_img = this.singleData.image[0];     
   this.modalService.open(centerDataModal, { size: 'xl', centered: true });
 }

 // Image Click Filtering
 filterImg(id:any){
   this.product_img = this.singleData.image[id]
 }

 /**
 * Range Slider Wise Data Filter
 */
 // Range Slider
 minValue: number = 250;
 maxValue: number = 721;
 options: Options = {
   floor: 0,
   ceil: 1000,
   translate: (value: number): string => {
     return '$' + value;
   }
 };
 valueChange(value: number, boundary: boolean): void {
   if (boundary) {
     this.minValue = value;
   } else {
     this.maxValue = value;
     this.Gridlists = ShopGridLsdata.filter((data:any) => {     
       data.price = data.price.replace(/,/g, '')        
       return data.price >= this.minValue && data.price <= this.maxValue;
     });
     this.total = this.Gridlists.length;
   }
 }

  // Category Filtering  
  categoryFilter(e:any,name: any) {        
   if (name != 'All') {      
     this.Gridlists = ShopGridLsdata.filter((product:any) => {     
       return product.cat === name;
     });  
     this.total = this.Gridlists.length; 
     this.total != 0 ? document.querySelector('.data-blank')?.classList.add('d-none'):document.querySelector('.data-blank')?.classList.remove('d-none');
     
   } else {   
    this.total = ShopGridLsdata.length;        
     return this.Gridlists = this.AllGridlists;
   }
 }

 // Brand Filtering
 checkedVal: any[] = [];
 refreshCountries() {
   var checkboxes:any = document.getElementsByName('category[]');
   var result
   this.checkedVal = [];
   for (var i = 0; i < checkboxes.length; i++) {
     if (checkboxes[i].checked) {
         result = checkboxes[i].value;
         this.checkedVal.push(result);   
     }
   }    
   if(this.checkedVal.length > 0){
     this.Gridlists = ShopGridLsdata.filter((product:any) => {     
       return this.checkedVal.includes(product.brand);
     });
     this.total = this.Gridlists.length; 
   }
   else{
    this.total = ShopGridLsdata.length;   
     return this.Gridlists = this.AllGridlists;
   }
 }

 // Product Size Filter
 sizeFilter() {
   var checkboxes:any = document.getElementsByName('category[]');
   var result
   // checkbox array data get
   this.checkedVal = [];
   for (var i = 0; i < checkboxes.length; i++) {
     if (checkboxes[i].checked) {
         result = checkboxes[i].value;
         this.checkedVal.push(result);   
     }
   } 
   // check box check wise data get
   this.AllGridSize = []; 
   if(this.checkedVal.length > 0){
     this.Gridlists = ShopGridLsdata.filter((product:any) => {     
       for(var i=0; i< product.size.length;i++){
         for(var j=0;j< this.checkedVal.length;j++){
           if(product.size[i] == this.checkedVal[j]){
             this.AllGridSize.push(product)
           }
         }
       }
     });
     this.AllGridSize = [...new Map(this.AllGridSize.map((item:any) => [item['id'], item])).values()]
     this.Gridlists = this.AllGridSize
     this.total = this.Gridlists.length;
   }
   else{
    this.total = ShopGridLsdata.length;   
     return this.Gridlists = this.AllGridlists;
   }
 }

 // Product Color Filter
 colorFilter() {
   var checkboxes:any = document.getElementsByName('category[]');
   var result
   // checkbox array data get
   this.checkedVal = [];
   for (var i = 0; i < checkboxes.length; i++) {
     if (checkboxes[i].checked) {
         result = checkboxes[i].value;
         this.checkedVal.push(result);   
     }
   } 
   // check box check wise data get
   this.AllGridColor = []; 
   if(this.checkedVal.length > 0){
     this.Gridlists = ShopGridLsdata.filter((product:any) => {     
       for(var i=0; i< product.colors.length;i++){
         for(var j=0;j< this.checkedVal.length;j++){
           if(product.colors[i] == this.checkedVal[j]){
             this.AllGridColor.push(product)
           }
         }
       }
     });
     this.AllGridColor = [...new Map(this.AllGridColor.map((item:any) => [item['id'], item])).values()]
     this.Gridlists = this.AllGridColor
     this.total = this.Gridlists.length;
   }
   else{
    this.total = ShopGridLsdata.length;   
     return this.Gridlists = this.AllGridlists;
   }
 }

  // Cart 
  cart(id:any){
    CartData.push(this.Gridlists[id])
  }

}
