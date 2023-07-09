import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Token } from 'src/app/core/model/token.model';
import { environment } from "src/environments/environment";

// Swiper Slider
import { SwiperOptions } from 'swiper';

// Data Get
import { discout, Bestsellers, review } from './data';
import { Router } from '@angular/router';

import { UntypedFormBuilder, UntypedFormGroup, Validators, FormBuilder } from '@angular/forms';
import { EmailService } from 'src/app/services/email/email.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/core/model/user.model';

import { CatalogModel } from '../product-catalog/product-catalog.model';
import { CartService } from 'src/app/services/cart/cart.service';


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
  tooManyProposal:boolean
  baseUrl: string = environment.baseApiUrl;
  submitInvoice = false;
  msg: any;
  idList: any[];
  ProductList!: CatalogModel[];
  products:any;

  constructor(
    public router: Router, private formBuilder: UntypedFormBuilder, private contact: EmailService, 
    private authService: AuthService, private httpClient: HttpClient,
    public cartService: CartService,

    ) { }

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
        this.router.navigate(['/grocery/product-catalog/all'])
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
  }

  get f(){return this.LoginForm.controls}

  async onSubmitted(){
    this.submitted=true;
  
    try {
      if(this.LoginForm.invalid){
        return;
      }
      let res: any = await this.authService.login(this.loginuser);     
      if (res) {
        let obj = res && res.success ? res.success : null;
        //We save the token here
        await this.authService.saveToken(obj);
        let user: User = new User();

        user.username = this.loginuser.username

        await this.authService.storeUser(obj.tokenId);
        //we find credit note
        await this.authService.saveCreditNote()
        this.authService.loginStatusChanged.next(true);
        //we go home
        this.authService.gotoHome();
      }
    }catch (error) {
      console.log("error", error);
    }
    try{
      let userInfo: any = await this.authService.userInfo();
      if(userInfo){
        let socid=userInfo.socid;
        await this.authService.storeInt('socid', socid);
        await this.checkOnGoingProposal()
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

  async checkOnGoingProposal(){
      console.log('checkOnGoingProposal:')
      let proposal:any[]=[]
      let url = this.baseUrl + '/proposals';
      //TODO CHANGE
      let thirdparty_ids = this.authService.getthirdparty_ids()
      if(thirdparty_ids) thirdparty_ids = parseInt(thirdparty_ids)
      console.log('thirdparty_ids:', thirdparty_ids)
      let queryParams = new HttpParams();
      queryParams = queryParams.append("thirdparty_ids", thirdparty_ids);
      queryParams = queryParams.append("sortorder", "DESC");
  
      let storeToken: Token;
      storeToken = this.authService.getTokenData();
      console.log('storeToken:', storeToken)
  
      //TODO REMOVE HARD CODE TOKEN
      const key: string = storeToken.tokenId;
  
      let header = new HttpHeaders({ 'DOLAPIKEY': key });
      await this.httpClient.get(url, { headers: header, params:queryParams }).subscribe(
        res=>{
          console.log('res:', res)
          proposal = Object.assign([], res);
          let onGoingProposal = proposal.filter(x => x.status=="0" || x.status=="1").length;
          console.log('onGoingProposal:', onGoingProposal)
          if(onGoingProposal>=3) this.authService.storeObj('tooManyProposal', true);
          else this.authService.storeObj('tooManyProposal', false);
        }
      ) 
  }
}
