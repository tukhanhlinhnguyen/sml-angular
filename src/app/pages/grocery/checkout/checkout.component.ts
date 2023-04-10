import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Data Get
import { cart } from './data';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  breadCrumbItems: any;
  cartproduct: any;
  subtotal: any = 0;
  total: any = 0;

  orderForm!: UntypedFormGroup;
  submitted = false;

  constructor(private formBuilder: UntypedFormBuilder,
  public router:Router) { }

  ngOnInit(): void {

    // When the user clicks on the button, scroll to the top of the document
    document.documentElement.scrollTop = 0;

    /**
* BreadCrumb
*/
    this.breadCrumbItems = [
      { label: 'Home', link: '/grocery' },
      { label: 'Checkout', active: true, link: '/grocery/Checkout' }
    ];

    // Fetch Data
    this.cartproduct = cart
    this.cartproduct.forEach((element: any) => {
      this.subtotal += parseFloat(element.price)
    });

    this.total = (this.subtotal + 7.00).toFixed(2)
    this.subtotal = this.subtotal.toFixed(2)

    // set decimal point to small
    setTimeout(() => {
      document.querySelectorAll(".price").forEach((e) => {
        let txt = e.innerHTML.split(".")
        e.innerHTML = txt[0] + ".<small>" + txt[1] + "</small>"
      })
    }, 0);

    /**
     * Form Validation
     */
    this.orderForm = this.formBuilder.group({
      ids: [''],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });
  }


  // Change Payment Method
  changepaymentmethod(id: any) {
    document.querySelectorAll('.methods').forEach(element => {
      element.classList.remove('show')
    });
    document.getElementById(id)?.classList.add('show')
  }

  /**
* Form data get
*/
  get form() {
    return this.orderForm.controls;
  }

  // Go To Detail Page
  gotodetail(id: any) {
    this.router.navigate(['/single-product', this.cartproduct[id]])
  }

  placeorder() {
    this.submitted = true;
  }


}
