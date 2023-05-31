import { Injectable } from "@angular/core";
import { HttpClient, HttpBackend, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { User } from "../../core/model/user.model";
import { Token } from "../../core/model/token.model";
import { AuthService } from "../auth/auth.service"

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private authService : AuthService, private _http: HttpClient) { }

  async createProposal() {
    const url = environment.baseApiUrl + '/proposals';

    let user: User = this.authService.getUser();
    let socId = localStorage.getItem("socid") || null;

    let body = {
        "socid": socId || "",
        // "date": "1672317842",
        "date": Date.now(),
        // "request_data": [
        //     // "121"
        // ]
    };

    let storeToken: Token;
    storeToken = this.authService.getTokenData();

    const key: string = storeToken ? storeToken.tokenId || "" : "";

    // let header = new HttpHeaders({ 'content-type': 'application/x-www-form-urlencoded' });
    let header = new HttpHeaders({ 'DOLAPIKEY': key });

    return await this._http.post(url, body, { headers: header }).toPromise();
}

async createProposalLines(id: any, body: any[]) {
    const url = environment.baseApiUrl + '/proposals/' + id + '/lines';

    let user: User = this.authService.getUser();
    let socId = localStorage.getItem("socId") || null;

    let storeToken: Token;
    storeToken = this.authService.getTokenData();

    const key: string = storeToken ? storeToken.tokenId || "" : "";

    // let header = new HttpHeaders({ 'content-type': 'application/x-www-form-urlencoded' });
    let header = new HttpHeaders({ 'DOLAPIKEY': key });

    return await this._http.post(url, body, { headers: header }).toPromise();
}
}
