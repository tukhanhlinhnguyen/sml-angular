import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

// Data Get
import { cart } from './data';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  msg: any;

  orderForm!: UntypedFormGroup;
  submitted = false;
  // deliveryFee = 7.00;
  deliveryFee: any = 0.00;

  _isLoggedIn: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private formBuilder: UntypedFormBuilder,
    private _authService: AuthService,
    private modalService: NgbModal,
    public router: Router
  ) {
    // this.deliveryFee = (this.deliveryFee + 0).toFixed(2)
    this.deliveryFee = this.deliveryFee.toFixed(2)
  }

  ngOnInit(): void {


    this._isLoggedIn = this._authService.checkLogin();

    this._authService.loginStatusChanged.subscribe(
      (IsLoggedIn) => {
        // console.log("testing");
        // this._logService.logMessage('on init loginStatusChanged: ' + IsLoggedIn);

        this._isLoggedIn = IsLoggedIn;
      }
    );

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
      this.subtotal += (parseFloat(element.price) * parseFloat(element.qty))
    });

    // this.total = (this.subtotal + 7.00).toFixed(2)
    // this.total = (this.subtotal + this.deliveryFee).toFixed(2)
    this.total = (this.subtotal + parseFloat(this.deliveryFee)).toFixed(2)
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
      // first_name: ['', [Validators.required]],
      // last_name: ['', [Validators.required]],
      // phone: ['', [Validators.required]],
      // address: ['', [Validators.required]],
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
    // this.router.navigate(['/single-product', this.cartproduct[id]])
    this.router.navigate(['/grocery/single-product', this.cartproduct[id]])
  }

  async placeorder() {
    console.log("placeorder")
    this.msg = null;
    this.submitted = true;

    let m: any = this.document.getElementById("msgmodal");
    // m.click();

    if (this._isLoggedIn) {

      try {

        let res: any = await this._authService.createProposal();

        console.log("res:", res);

        // if (res && res.Status) {
        if (res) {

          this.cartproduct.forEach(async (element: any) => {
            setTimeout(async () => {
              try {

                let res1: any = await this._authService.createProposalLine(res, element);
  
              } catch (error) {
                console.log("error:", error);
  
                m.click();
                this.msg = JSON.stringify(error);
              }
            }, 100);
          });


          m.click();
          this.msg = "Propasal Created. " + res;
        }

      } catch (error) {
        console.log("error:", error);

        m.click();
        this.msg = JSON.stringify(error);
      }

    }
    else {
      // let si: any = this.document.getElementById("sign-in") as HTMLElement;
      let si: any = this.document.getElementById("sign-in");
      // let si: any = this.document.getElementById("test");

      console.log("si", si)

      si.click();
    }

  }

  /**
 * Open scroll modal
 * @param toggleDataModal scroll modal data
 */
  toggleModal(staticDataModal: any) {
    this.modalService.open(staticDataModal, { size: 'md', centered: true });
  }

}
