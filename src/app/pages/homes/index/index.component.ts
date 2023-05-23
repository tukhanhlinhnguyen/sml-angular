import { Component, OnInit, ViewChild } from '@angular/core';
import { EmailValidator, FormControl, UntypedFormBuilder, UntypedFormGroup, Validators, FormBuilder } from '@angular/forms';
import { EmailService } from 'src/app/services/email.service';

// Swiper Slider
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})

/**
 * Index Component
 */
export class IndexComponent implements OnInit {
  
  //Login Form
  LoginForm!: UntypedFormGroup;
  submitted=false;

  //SignUp Form
  SignUpPassField!: boolean;
  SignUpCPassField!: boolean;
  SignUpForm!: UntypedFormGroup;
  submit=false;

  loginPassfield!: boolean;
  Societe:any;
  email:any;
  numTel:any;
  KBis:any;

  constructor(private formBuilder: UntypedFormBuilder, private contact: EmailService) { }

  ngOnInit(): void { 

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
    Societe:['dưec',[Validators.required]],
    email:['bgrbr@vrvr.ft',[Validators.required]],
    numTel:['1',[Validators.required]],
    KBis:['1',[Validators.required]]
   })
  }

  get f(){return this.LoginForm.controls}

  onSubmitted(){
    this.submitted=true;
    if(this.LoginForm.invalid){
      return;
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
      location.href='../grocery/product-catalog.component.html'
      console.log(response),
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
  Coverflow: SwiperOptions = {
    pagination: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    effect:'fade',
  };

}
