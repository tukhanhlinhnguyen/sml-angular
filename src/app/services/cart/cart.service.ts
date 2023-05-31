import { Injectable } from '@angular/core';
import { ProductModel } from '../../models/product';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private authService: AuthService) { }

  addToCart(qty:number, product: ProductModel) {
    //process data
    let p = this.deepCopy(product);
    p.qty=qty
    //check if item already in cart
    let cart = localStorage.getItem("cart")
    let result = cart ? JSON.parse(cart) : []
    console.log('product.id:', product.id)
    let index = result.findIndex( (t:any) => t.id === product.id)
    if(index>=0){
      let p = this.deepCopy(result[index])
      let newQty = Number(p.qty) + Number(qty)
      p.qty = newQty
      result[index] = p
    }else{
      product.qty=1
      result.push(product);
    }
    let now = new Date();
    let time = now.getTime();
    let expireTime = time + 1000*36000;
    now.setTime(expireTime);
    localStorage.setItem("cart", JSON.stringify(result));
    localStorage.setItem("expires", now.toUTCString());
    this.authService.mycartChanged.next(true);
  }

  getCart() {
    let cart = localStorage.getItem("cart")
    let result = cart ? JSON.parse(cart) : []
    return result;
  }

  setCart(cart:any) {
    let now = new Date();
    let time = now.getTime();
    let expireTime = time + 1000*36000;
    now.setTime(expireTime);
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("expires", now.toUTCString());
  }

  public deepCopy(oldObj: any) {
    var newObj = oldObj;
    if (oldObj && typeof oldObj === "object") {
      newObj = Object.prototype.toString.call(oldObj) === "[object Array]" ? [] : {};
      for (var i in oldObj) {
        newObj[i] = this.deepCopy(oldObj[i]);
      }
    }
    return newObj;
  }
}
