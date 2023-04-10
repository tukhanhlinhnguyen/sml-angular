import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-help-submit-request',
  templateUrl: './help-submit-request.component.html',
  styleUrls: ['./help-submit-request.component.scss']
})

/**
 * Help Submit Request Component
 */
export class HelpSubmitRequestComponent implements OnInit {

  breadCrumbItems!: Array<{}>;
  contactForm!: UntypedFormGroup;
  submitted = false;

  constructor(private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
     this.breadCrumbItems = [
      { label: 'Home', link:'/fashion-store-v1' },
      { label: 'Help center', link:'/pages/submit-request' },
      { label: 'Submit request', active: true, link:'/pages/submit-request' }
    ];

    /**
     * Form Validatyion
     */
     this.contactForm = this.formBuilder.group({
      topic: ['', [Validators.required]],
      message: ['', [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });
  }

  // convenience getter for easy access to form fields
  get form() { return this.contactForm.controls; }

  /**
  * Form submit
  */
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.contactForm.invalid) {
      return;
    }
  }

}
