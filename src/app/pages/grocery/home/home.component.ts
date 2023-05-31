import { Component, OnInit } from '@angular/core';

// Swiper Slider
import { SwiperOptions } from 'swiper';

// Data Get
import { discout, Bestsellers, review } from './data';
import { Router } from '@angular/router';

import { EmailValidator, FormControl, UntypedFormBuilder, UntypedFormGroup, Validators, FormBuilder } from '@angular/forms';
import { EmailService } from 'src/app/services/email/email.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/core/model/user.model';
import { Societe } from 'src/app/core/model/Societe.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

/**
 * Home Component
 */
export class HomeComponent implements OnInit {
  loginuser: User = new User();
  user: User = new User();
  
  //Login Form
  LoginForm!: UntypedFormGroup;
  submitted=false;

  //SignUp Form
  SignUpPassField!: boolean;
  SignUpCPassField!: boolean;
  SignUpForm!: UntypedFormGroup;
  submit=false;

  loginPassfield!: boolean;
  _isLoggedIn: boolean = false;
  discountedproduct: any;
  bestseller: any;
  reviews: any;

  constructor(public router: Router, private formBuilder: UntypedFormBuilder, private contact: EmailService, private authService: AuthService) { }

  ngOnInit(): void {
    this._isLoggedIn = this.authService.checkLogin();
    this.user = this.authService.getUser();

    this.authService.loginStatusChanged.subscribe(
      (IsLoggedIn) => {
        this.user = this.authService.getUser();
        this._isLoggedIn = IsLoggedIn;
      }
    );

    this.authService.loginUserStatusChanged.subscribe(
      (user) => {
        this.user = this.authService.getUser();
        //console.log(user)
      },
      (error) => {
        console.error(error)
      },
      () => {
        console.log('Login state has been marked completed!')
      }
    );
    /*
    /Log In
    */
    this.LoginForm=this.formBuilder.group({
      email:['',[Validators.required,]],
      password:['', Validators.required]
    })

    /*
    /Sign Up
    */
   this.SignUpForm=this.formBuilder.group({
    Societe:['',[Validators.required]],
    email:['',[Validators.required]],
    numTel:['',[Validators.required]],
    KBis:['',[Validators.required]]
   })

    // When the user clicks on the button, scroll to the top of the document
    document.documentElement.scrollTop = 0;

    // Fetch Data
    this.discountedproduct = discout
    this.bestseller = Bestsellers
    this.reviews = review

    // set decimal point to small
    setTimeout(() => {
      document.querySelectorAll(".product-price").forEach((e) => {
        let txt = e.innerHTML.split(".")
        e.innerHTML = txt[0] + ".<small>" + txt[1] + "</small>"
      })
    }, 0);
  }

  get f(){return this.LoginForm.controls}

  async onSubmitted(){
    this.submitted=true;
    
    if(this.LoginForm.invalid){
      return;
    }
    
    try {
      let res: any = await this.authService.login(this.loginuser);
     
      console.log("res", res);
     
      if (res) {

        let obj = res && res.success ? res.success : null;
       

        this.authService.saveToken(obj);
       


        let user: User = new User();

        // user.username = obj && obj.username ? obj.username || null : null;
        user.username = this.loginuser.username || this.loginuser.useremail || this.loginuser.email;
        user.useremail = this.loginuser.username || this.loginuser.useremail || this.loginuser.email;
        user.userdisplayname = this.loginuser.username || this.loginuser.useremail || this.loginuser.email;
        //user.socID = this.loginuser.socID || this.loginuser.username || this.loginuser.useremail;

        this.authService.storeUser(user);

        this.authService.loginStatusChanged.next(true);
        this.authService.gotoHome();
      }
  }catch (error) {
    console.log("error", error);

  }
  try{
    let societeid: any = await this.authService.userInfo();
    console.log("socid", societeid);

    if(societeid){

      let objSocID = societeid ? societeid : null;
      console.log(objSocID);

      await this.authService.saveSocID(objSocID)

      let SocID: Societe= new Societe;

      SocID=this.loginuser.socID;

      this.authService.storeSocID(SocID);
    }
  }
  catch (error){
    console.log("error", error);
  }
  
    
}

  //Hide or show password
  toggleLoginPassField() {
    this.loginPassfield = !this.loginPassfield;
  }

  // convenience getter for easy access to form fields
  get fa() { return this.SignUpForm.controls; }

  /**
   * Form submit
   */
  SignUpSubmit(SignUpForm:any) {
    console.log(this.SignUpForm.value)
    this.contact.SendEmail(SignUpForm)
    .subscribe((response) => {
      //location.href='../grocery/product-catalog.component.html'
      console.log(response),
      this.authService.gotoHome();
      (error:any) => {
        console.warn(error.responseType)
        console.log({error})
      }
    }
    )

    // stop here if form is invalid
    if (this.SignUpForm.invalid) {
      return;
    }
  }

//   /**
//  * Password Hide/Show
//  */
//   togglesignupPassfield() {
//     this.SignUpPassField = !this.SignUpPassField;
//   }

//   /**
//   * Password Hide/Show
//   */
//   togglesignupCPassfield() {
//     this.SignUpCPassField = !this.SignUpCPassField;
//   }
  /**
  * Swiper Coverflow setting
  */
  
  /**
  * Swiper Coverflow setting
  */
  Coverflow: SwiperOptions = {
    pagination: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    effect: 'fade',
  };

  /**
 * Swiper Discount Product setting
 */
  Discount: SwiperOptions = {
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 15,
    breakpoints: {
      575: {
        slidesPerView: 1,
      },
      1080: {
        slidesPerView: 5,
      },
    },
  };

  /**
 * Swiper Review setting
 */
  Review: SwiperOptions = {
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      575: {
        slidesPerView: 1,
      },
      1080: {
        slidesPerView: 4,
      },
    },
  };

  // Go To Detail Page
  gotodetail(id: any) {
    this.router.navigate(['/single-product',this.discountedproduct[id]])
  }

  gotosellerdetail(id: any) {
    this.router.navigate(['/single-product',this.bestseller[id]])
  }


  // Add To Cart
  addtocart(id: any) {
    // cart.push(this.discountedproduct[id])
  }

}
