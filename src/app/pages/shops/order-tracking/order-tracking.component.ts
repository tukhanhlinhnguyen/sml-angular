import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Data Get
import { CartData } from './data';

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.scss']
})

/**
 * Order Tracking Component
 */
export class OrderTrackingComponent implements OnInit {

  cartDatas:any;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.cartDatas = CartData;
  }

  /**
  * Open center modal and product data get
  * @param centerDataModal center modal data
  */
   product_img:any;
   singleData:any;
   centerModal(centerDataModal: any) {
    this.modalService.open(centerDataModal, { size: 'lg', centered: true });
  }
 

}
