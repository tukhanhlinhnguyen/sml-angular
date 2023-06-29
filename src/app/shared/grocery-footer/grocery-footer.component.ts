import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-grocery-footer',
  templateUrl: './grocery-footer.component.html',
  styleUrls: ['./grocery-footer.component.scss']
})
export class GroceryFooterComponent implements OnInit{
  smlFacebookURL = environment.smlFacebookURL
  smlEuroPageURL = environment.smlEuroPageURL

  constructor(
    public translateService: TranslateService
  ) {
  }

  ngOnInit(): void {
    //TODO
    if(!this.translateService.currentLang){
      console.log('TODO:', this.translateService.use('fr'))
    }
    
  }
}
