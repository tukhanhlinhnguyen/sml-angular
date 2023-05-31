import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

// Data Get
import { AuthService } from 'src/app/services/auth/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../../../services/cart/cart.service';
import { CheckoutService } from '../../../services/checkout/checkout.service';
import { PriceService } from '../../../services/price/price.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  breadCrumbItems: any;
  cart: any;
  subtotalHT: any = 0;
  subtotalTTC: any = 0;
  totalTVA20: any = 0;
  totalTVA5: any = 0;
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
    private cartService: CartService,
    private checkoutService: CheckoutService,
    public priceService: PriceService,
    private modalService: NgbModal,
    public router: Router
  ) {
    // this.deliveryFee = (this.deliveryFee + 0)
    this.deliveryFee = this.deliveryFee
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
    this.cart = this.cartService.getCart()
    this.cart.forEach((e: any) => {
      this.subtotalHT += (parseFloat(e.price) * parseFloat(e.qty))
      this.subtotalTTC += (parseFloat(e.price_ttc) * parseFloat(e.qty))
      console.log('tva_tx:', this.priceService.roundNumber(e.tva_tx))
      if(this.priceService.roundNumber(e.tva_tx)==5.5) this.totalTVA5+= (parseFloat(e.price) * parseFloat(e.qty) * parseFloat(e.tva_tx)/100)
      if(this.priceService.roundNumber(e.tva_tx)==20) this.totalTVA20+= (parseFloat(e.price) * parseFloat(e.qty) * parseFloat(e.tva_tx)/100)  
    });

    // this.total = (this.subtotalHT + 7.00)
    // this.total = (this.subtotalHT + this.deliveryFee)
    this.total = (this.subtotalHT + parseFloat(this.deliveryFee))
    this.subtotalHT = this.subtotalHT

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
    document.querySelectorAll('.methods').forEach(e => {
      e.classList.remove('show')
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
    // this.router.navigate(['/single-product', this.cart[id]])
    this.router.navigate(['/grocery/single-product', this.cart[id]])
  }

  async placeorder() {
    console.log("placeorder")
    this.msg = null;
    this.submitted = true;

    let m: any = this.document.getElementById("msgmodal");
    // m.click();

    if (this._isLoggedIn) {

      try {

        let res: any = await this.checkoutService.createProposal();

        console.log("res:", res);

        // if (res && res.Status) {
        if (res) {
          let body:any = []
          this.cart.forEach(async (e: any) => {
            body.push({
              "fk_product": e.id,
              "qty": e.qty,
              "subprice": e.price,
              "tva_tx": e.tva_tx
            });
          });
            // setTimeout(async () => {
              try {

                let res1: any = await this.checkoutService.createProposalLines(res, body);
  
              } catch (error) {
                console.log("error:", error);
  
                m.click();
                this.msg = JSON.stringify(error);
              }
            // }, 100);
          


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
      // let si: any = this.document.geteById("sign-in") as HTMLe;
      let si: any = this.document.getElementById("sign-in");
      // let si: any = this.document.geteById("test");

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
