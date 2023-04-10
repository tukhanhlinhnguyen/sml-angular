import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbActiveOffcanvas, NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationEnd } from '@angular/router';

import { cart } from 'src/app/pages/grocery/checkout/data';

@Component({
  selector: 'app-grocery-header',
  templateUrl: './grocery-header.component.html',
  styleUrls: ['./grocery-header.component.scss']
})
export class GroceryHeaderComponent {
  loginPassfield!: boolean;
  public isCollapsed = true;
  cartDatas: any;
  subTotal = 0;
  Total: any;
  mycart: any;
  subtotal: any = 0;
  total: any = 0;

  // Login Form
  loginForm!: UntypedFormGroup;
  submitted = false;

  //  Signup form
  signupPassfield!: boolean;
  signupCPassfield!: boolean;
  SignupForm!: UntypedFormGroup;
  submit = false;

  constructor(private modalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    public router: Router, private offcanvasService: NgbOffcanvas) { }

  ngOnInit(): void {
    /**
     * Form Validatyion
     */
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });

    /**
     * Form Validatyion
     */
    this.SignupForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      name: ['', [Validators.required]],
      password: ['', Validators.required],
    });

    // Fetch Data
    this.mycart = cart
    this.mycart.forEach((element: any) => {
      this.subtotal += parseFloat(element.price)
    });
    this.subtotal = this.subtotal.toFixed(2)

    // set decimal point to small
    setTimeout(() => {
      document.querySelectorAll(".price").forEach((e) => {
        let txt = e.innerHTML.split(".")
        e.innerHTML = txt[0] + ".<small>" + txt[1] + "</small>"
      })
    }, 0);
  }

  open() {
    document.getElementById('sideNav')?.classList.add('show')
    document.querySelector('.nav-item')?.classList.remove('d-none')
  }


  /**
   * Open scroll modal
   * @param toggleDataModal scroll modal data
   */
  toggleModal(staticDataModal: any) {
    this.modalService.open(staticDataModal, { size: 'md', centered: true });
  }

  //------------------ Sign In Form ---------------------//
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
  }

  /**
   * Password Hide/Show
   */
  toggleLoginPassField() {
    this.loginPassfield = !this.loginPassfield;
  }

  //------------------ Sign Up Form ---------------------//

  // convenience getter for easy access to form fields
  get fa() { return this.SignupForm.controls; }

  /**
   * Form submit
   */
  SignupSubmit() {
    this.submit = true;

    // stop here if form is invalid
    if (this.SignupForm.invalid) {
      return;
    }
  }

  /**
  * Password Hide/Show
  */
  togglesignupPassfield() {
    this.signupPassfield = !this.signupPassfield;
  }

  /**
  * Password Hide/Show
  */
  togglesignupCPassfield() {
    this.signupCPassfield = !this.signupCPassfield;
  }

  // tslint:disable-next-line: typedef
  windowScroll() {
    const navbar = document.querySelector('.navbar-sticky');
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      navbar?.classList.add('navbar-stuck');
      document.querySelector(".btn-scroll-top")?.classList.add('show');
    }
    else {
      navbar?.classList.remove('navbar-stuck');
      document.querySelector(".btn-scroll-top")?.classList.remove('show');
    }
  }

  // Go To Detail Page
  gotodetail(id: any) {
    this.router.navigate(['/grocery/single-product', this.mycart[id]])
  }

  // Remove From Cart
  removecart(id: any) {
    this.subtotal = 0;
    cart.splice(id, 1)
    cart.forEach((element: any) => {
      this.subtotal += parseFloat(element.price)
    });
    this.subtotal = this.subtotal.toFixed(2)
  }
}
