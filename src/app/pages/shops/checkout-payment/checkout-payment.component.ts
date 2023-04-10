import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})

/**
 * Checkout Payment Component
 */
export class CheckoutPaymentComponent implements OnInit {

  promocodeForm!: UntypedFormGroup;
  submitted = false;

  constructor(private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    /**
    * Form Validatyion
    */
    this.promocodeForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
  }

   // convenience getter for easy access to form fields
   get form() { return this.promocodeForm.controls; }

   /**
   * Form submit
   */
   onSubmit() {
     this.submitted = true;
     // stop here if form is invalid
     if (this.promocodeForm.invalid) {
       return;
     }
   }

}
