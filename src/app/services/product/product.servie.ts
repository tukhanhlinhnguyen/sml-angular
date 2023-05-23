import { Injectable } from '@angular/core';
import { ProductModel } from '../../models/product';
import { HttpClient, HttpBackend, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { User } from "../../core/model/user.model";
import { Token } from "../../core/model/token.model";
import { AuthService } from "../../services/auth/auth.service";


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  items: ProductModel[] = [];

  constructor(private _http: HttpClient, private authService: AuthService) { }

  getProductById(id: number) {
    const url = environment.baseApiUrl + '/products/' +id;
    let storeToken: Token;
    storeToken = this.authService.getTokenData();

    const key: string = storeToken ? storeToken.tokenId || "" : "";
    let header = new HttpHeaders({ 'DOLAPIKEY': key });

    return this._http.get<ProductModel>(url, { headers: header });
  }

  getItems() {
    return this.items;
  }
}