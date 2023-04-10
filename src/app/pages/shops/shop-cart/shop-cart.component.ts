import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

// Data Get
import { CartData } from './data';

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.scss']
})

/**
 * Shop Cart Component
 */
export class ShopCartComponent implements OnInit {

  // Card Form
  cardForm!: UntypedFormGroup;
  submitted = false;

  // Shipping Form
  shippingForm!: UntypedFormGroup;
  submit = false;

  cartDatas:any;
  qty:any = 1;
  subTotal=0;

  constructor(private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
     /**
     * Form Validatyion
     */
      this.cardForm = this.formBuilder.group({
        code: ['', [Validators.required]],
      });

    /**
     * Shipping Form Validatyion
     */
     this.shippingForm = this.formBuilder.group({
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      code: ['', [Validators.required]],
    });

    this.cartDatas = CartData;
    this.cartDatas.forEach((element:any) => {
      element['total'] = parseFloat(element.price);
      element['qty'] = 1;
      this.subTotal += parseFloat(element.price)
    });    
  }

  // Quantity wise price total or total update
  quantity(id:any,ev:any){
    this.qty = ev.target.value
   
    this.cartDatas[id].total = parseFloat(this.cartDatas[id].price)*this.qty; 
    if( this.cartDatas[id].qty < this.qty){
      this.subTotal += parseFloat(this.cartDatas[id].price)
    }
    else{
      this.subTotal -= parseFloat(this.cartDatas[id].price)
    }
    this.cartDatas[id].qty = this.qty
  }

  // Remove Cart
  removeCart(event:any,id:any){
    this.subTotal -= parseFloat(this.cartDatas[id].total)
    event.target.closest('.border-bottom').remove();
  }

  // convenience getter for easy access to form fields
  get form() { return this.cardForm.controls; }

  /**
  * Form submit
  */
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.cardForm.invalid) {
      return;
    }
  }

   // convenience getter for easy access to form fields
   get sform() { return this.shippingForm.controls; }

   /**
   * Form submit
   */
   Submit() {
     this.submit = true;
     // stop here if form is invalid
     if (this.shippingForm.invalid) {
       return;
     }
   }

}
