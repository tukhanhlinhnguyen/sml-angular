import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbActiveOffcanvas, NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationEnd } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/core/model/user.model';
import { Subject } from 'rxjs/internal/Subject';
import { CartService } from 'src/app/services/cart/cart.service';


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

  loginuser: User = new User();
  user: User = new User();

  // Login Form
  loginForm!: UntypedFormGroup;
  submitted = false;

  //  Signup form
  signupPassfield!: boolean;
  signupCPassfield!: boolean;
  SignupForm!: UntypedFormGroup;
  submit = false;
  _isLoggedIn: boolean = false;

  constructor(private modalService: NgbModal,
    private authService: AuthService,
    private formBuilder: UntypedFormBuilder,
    private cartService: CartService,
    public router: Router, private offcanvasService: NgbOffcanvas) { }

  ngOnInit(): void {
    this._isLoggedIn = this.authService.checkLogin();
    this.user = this.authService.getUser();

    this.authService.loginStatusChanged.subscribe(
      (IsLoggedIn) => {
        this.user = this.authService.getUser();
        // console.log("testing");
        // this._logService.logMessage('on init loginStatusChanged: ' + IsLoggedIn);

        this._isLoggedIn = IsLoggedIn;
      }
    );

    this.authService.loginUserStatusChanged.subscribe(
      (user) => {
        this.user = this.authService.getUser();
      },
      (error) => {
        console.error(error)
      },
      () => {
        console.log('Login state has been marked completed!')
      }
    );

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
    this.mycart = this.cartService.getCart()
    this.mycart.forEach((element: any) => {
      this.subtotal += (parseFloat(element.price) * parseFloat(element.qty))
    });
    this.subtotal = this.subtotal.toFixed(2)

    this.authService.mycartChanged.subscribe(
      (res) => {
        this.mycart = this.cartService.getCart()
        this.subtotal = 0
        this.mycart.forEach((element: any) => {
          this.subtotal = parseFloat(this.subtotal) + (parseFloat(element.price) * parseFloat(element.qty))

          // console.log("this.subtotal", this.subtotal)
        });
        this.subtotal = this.subtotal.toFixed(2)
      },
      (error) => {
        console.error(error)
      },
      () => {
        // console.log('Login state has been marked completed!')
      }
    );

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
  async onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    try {
      let res: any = await this.authService.login(this.loginuser);
      if (res) {

        let obj = res && res.success ? res.success : null;

        await this.authService.saveToken(obj);


        let user: User = new User();

        // user.username = obj && obj.username ? obj.username || null : null;
        user.username = this.loginuser.username || this.loginuser.useremail || this.loginuser.email;
        user.useremail = this.loginuser.username || this.loginuser.useremail || this.loginuser.email;
        user.userdisplayname = this.loginuser.username || this.loginuser.useremail || this.loginuser.email;

        this.authService.storeUser(user);

        this.authService.loginStatusChanged.next(true);

        // let si: any = this.document.getElementById("modalclose") as HTMLElement;
        let md: any = document.getElementById("modalclose");

        md.click();

        // document.getElementById('elmLoader')?.classList.add('d-none')
      }

    } catch (error) {
      console.log("error", error);

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
    this.mycart.splice(id, 1)
    this.mycart.forEach((element: any) => {
      this.subtotal += parseFloat(element.price)
    });
    this.subtotal = this.subtotal.toFixed(2)
    this.cartService.setCart(this.mycart)
  }

  onlogOut() {
    this.authService.logoutUser_();
  }
}
