import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationEnd } from '@angular/router';

// Language
import { CookieService } from 'ngx-cookie-service';
import { LanguageService } from 'src/app/services/language.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar-level2-dark',
  templateUrl: './navbar-level2-dark.component.html',
  styleUrls: ['./navbar-level2-dark.component.scss']
})

/**
 * Navbar-Level2-Dark Component
 */
export class NavbarLevel2DarkComponent implements OnInit {

  showNavigationArrows = true;
  showNavigationIndicators: any;

  loginPassfield!: boolean;
  
  // Login Form
  loginForm!: UntypedFormGroup;
  submitted = false;
  
  //  Signup form
  signupPassfield!: boolean;
  signupCPassfield!: boolean;
  SignupForm!: UntypedFormGroup;
  submit = false;
  public isCollapsed = true;

  flagvalue: any;
  selectedLanguage: any;
  flag: any;
  countryName: any;
  cookieValue: any;
  valueset: any;

  constructor(private router: Router, private modalService: NgbModal, private formBuilder: UntypedFormBuilder,public languageService: LanguageService,
    public _cookiesService: CookieService, public translate: TranslateService) { }

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

    // Language Set
    this.cookieValue = this._cookiesService.get('lang');
    const val = this.listLang.filter(x => x.lang === this.cookieValue);
    this.countryName = val.map(element => element.text);
    if (val.length === 0) {
      if (this.flagvalue === undefined) { this.valueset = 'assets/img/flags/en.png'; }
    } else {
      this.flagvalue = val.map(element => element.flag);
    }
    this.selectedLanguage = 'Eng / $'
    
  }

  // tslint:disable-next-line: typedef
  windowScroll() {
    const navbar = document.querySelector('.navbar-sticky');
    if (document.body.scrollTop > 350 || document.documentElement.scrollTop > 350) {
      navbar?.classList.add('navbar-stuck');
      document.querySelector(".btn-scroll-top")?.classList.add('show');
    }
    else {
      navbar?.classList.remove('navbar-stuck');
      document.querySelector(".btn-scroll-top")?.classList.remove('show');
    }
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

    // Sidebar Toggle
  sidebar(){
    document.getElementById('shop-sidebar')?.classList.add('show');
  }

  /***
  * Language Listing
  */
   listLang = [
    { text: 'English', flag: 'assets/img/flags/en.png', lang: 'en', language: 'Eng / $' },
    { text: 'Deutsche', flag: 'assets/img/flags/de.png', lang: 'de', language: 'DE / £' },
    { text: 'Italiana', flag: 'assets/img/flags/it.png', lang: 'it', language: 'IT / ¥' },
    { text: 'français', flag: 'assets/img/flags/fr.png', lang: 'fr', language: 'FR / €' },
  ];

  /***
   * Language Value Set
   */
  setLanguage(text: string, lang: string, flag: string,language:string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.cookieValue = lang;
    this.selectedLanguage = language
    this.languageService.setLanguage(lang);
  }

}
