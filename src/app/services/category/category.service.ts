import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient, HttpBackend, HttpHeaders } from "@angular/common/http";
import { User } from "../../core/model/user.model";
import { Token } from "../../core/model/token.model";
import { AuthService } from '../../services/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private _http: HttpClient;
  public categories: string[] = ['en', 'de', 'it', 'fr'];

  constructor(_handler: HttpBackend, public _authService: AuthService) {
    this._http = new HttpClient(_handler);
  }

  /***
   * Cookie Language set
   */
  getCategories() {
    const url = environment.baseApiUrl + '/categories';
    let storeToken: Token;
    storeToken = this._authService.getTokenData();

    const key: string = storeToken ? storeToken.tokenId || "" : "";
    let header = new HttpHeaders({ 'DOLAPIKEY': key });
    // return await this._http.get(url, { headers: header }).toPromise();
    return this._http.get(url, { headers: header });

}

}
