import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

// Data Get
import { AuthService } from 'src/app/services/auth/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../../../services/cart/cart.service';
import { CheckoutService } from '../../../services/checkout/checkout.service';
import { PriceService } from '../../../services/price/price.service';
import { ProposalService } from '../proposal/proposal.service';
import { GroceryHeaderComponent } from '../../../shared/grocery-header/grocery-header.component';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  @ViewChild(GroceryHeaderComponent) gHC: GroceryHeaderComponent; //see that viewChild argument is 

  breadCrumbItems: any;
  cart: any[];
  subtotalHT: any = 0;
  subtotalTTC: any = 0;
  totalTVA20: any = 0;
  totalTVA5: any = 0;
  total: any = 0;
  msg: any;
  creditNote: any;

  orderForm!: UntypedFormGroup;
  submitted = false;
  status:any;
  // deliveryFee = 7.00;
  deliveryFee: any = 0.00;

  _isLoggedIn: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    public priceService: PriceService,
    private modalService: NgbModal,
    public router: Router,
    public proposalService: ProposalService
  ) {
    // this.deliveryFee = (this.deliveryFee + 0)
    this.deliveryFee = this.deliveryFee
  }

  ngOnInit(): void {

    this._isLoggedIn = this.authService.checkLogin();

    let creditNote = this.authService.getCreditNote()

    this.authService.loginStatusChanged.subscribe(
      (IsLoggedIn) => {
        this._isLoggedIn = IsLoggedIn;
      }
    );

    // When the user clicks on the button, scroll to the top of the document
    document.documentElement.scrollTop = 0;
    this.checkStatus();

    //Get credit note
    this.creditNote = this.authService.getCreditNote();

    /**
* BreadCrumb
*/
    this.breadCrumbItems = [
      { label: 'Home', link: '/grocery/product-catalog/all' },
      { label: 'Checkout', active: true, link: '/grocery/Checkout' }
    ];

    this.authService.mycartChanged.subscribe({
      next: () => {
        this.cart = this.cartService.getCart()
        if(creditNote){
          console.log('creditNote:', creditNote)
          console.log('this.cart:', this.cart)
          this.cart.push(
            {
              "label": 'Remise',
              "qty": 1,
              "price_ttc": creditNote,
              "tva_tx": 0
            }
          )
        }
        this.updateSum()
      },
      error:(err) => {
        console.error(err)
      },
    })

    // Fetch Data
    //this.cart = this.cartService.getCart()
    this.authService.mycartChanged.next(true);
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

  confirmOrder(){
    console.log("OrderConfirm")
    this.msg = null;
    this.submitted = true;

    let m: any =this.document.getElementById("confirmation");
    m.click();
  }

  gotoPage(){
    window.location.href='/grocery/proposal';
  }

  async placeorder() {
    this.msg = null;
    this.submitted = true;
    
    let m: any;
    if (this._isLoggedIn) {
      try {
        let res: any = await this.checkoutService.createProposal();
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
          try{
            let res2: any = await this.checkoutService.validateProposalLines(res);
            this.gotoPage();
            } catch (error){
              console.log("error:", error);
            }
          m.click();
        }
        this.gotoPage();

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
      si.click();
    }
  }

  async checkStatus(){
    this.status=[]
    try{
      let res2: any = await this.proposalService.getProposal();
     
      if(res2){
        this.status=res2.statut_libelle
      }
    } catch (error) {
      console.log("error:", error);
    }
  }

  plus(qty:number) {
    qty++;
  }
  minus(qty:number) {
    if(qty > 1) qty--;
  }

  updateQuantity($event:any, i:number){
    const filterValue = ($event.target as HTMLInputElement).value;
    this.cart[i].qty = parseInt(filterValue)
    this.cartService.setCart(this.cart)
    this.authService.mycartChanged.next(true);
  }

  updateSum(){
    this.subtotalHT=0
    this.subtotalTTC=0
    this.cart.forEach((e: any) => {
      this.subtotalHT += (parseFloat(e.price) * parseFloat(e.qty))
      this.subtotalTTC += (parseFloat(e.price_ttc) * parseFloat(e.qty))
      if(this.priceService.roundNumber(e.tva_tx)==5.5) this.totalTVA5+= (parseFloat(e.price) * parseFloat(e.qty) * parseFloat(e.tva_tx)/100)
      if(this.priceService.roundNumber(e.tva_tx)==20) this.totalTVA20+= (parseFloat(e.price) * parseFloat(e.qty) * parseFloat(e.tva_tx)/100)  
    });

    //Add other fee
    this.total = (this.subtotalHT + parseFloat(this.deliveryFee)) + this.creditNote;
    //this.subtotalHT = this.subtotalHT
  }

  removeFromCart(i:number){
    this.gHC.removecart(i)
    this.authService.mycartChanged.next(true);
  }

  /**
 * Open scroll modal
 * @param toggleDataModal scroll modal data
 */
  toggleModal(staticDataModal: any) {
    this.modalService.open(staticDataModal, { size: 'md', centered: true });
  }

}
