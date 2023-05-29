import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-grocery-footer',
  templateUrl: './grocery-footer.component.html',
  styleUrls: ['./grocery-footer.component.scss']
})
export class GroceryFooterComponent implements OnInit{

  constructor(
    public translateService: TranslateService
  ) {
  }

  ngOnInit(): void {
    if(!this.translateService.currentLang){
      console.log('zadza:', this.translateService.use('fr'))
    }
    
  }
}
