import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  constructor() { }
  
  roundNumber(price:number){
    return (Math.round(price * 100) / 100)
  }
}
