import { Component } from '@angular/core';

@Component({
  selector: 'app-credit-note-indicator',
  templateUrl: './credit-note-indicator.component.html',
  styleUrls: ['./credit-note-indicator.component.scss']
})

export class CreditNoteIndicatorComponent {
  creditNote:any = localStorage.getItem("credit_note");

}
