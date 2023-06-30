import { Injectable } from "@angular/core";
import { HttpClient, HttpBackend, HttpHeaders, HttpContext, HttpContextToken } from "@angular/common/http";
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

    let socId = localStorage.getItem("socid") || null;

    let body = {
        "socid": socId || "",
        "date": Date.now(),
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

    let storeToken: Token;
    storeToken = this.authService.getTokenData();
    const key: string = storeToken ? storeToken.tokenId || "" : "";
    // let header = new HttpHeaders({ 'content-type': 'application/x-www-form-urlencoded' });
    let header = new HttpHeaders({ 'DOLAPIKEY': key });
    return await this._http.post(url, body, { headers: header }).toPromise();
}

async validateProposalLines(id:any){
  const url = environment.baseApiUrl + '/proposals/' + id + '/validate';
  let body:any= {"notrigger":1};
  let storeToken: Token;
  storeToken = this.authService.getTokenData();
  const key: string = storeToken ? storeToken.tokenId || "" : "";
  let header = new HttpHeaders({'DOLAPIKEY' : key});

  return await this._http.post(url, body, {headers: header}).toPromise();
}

async proposalInfo (){
  const url=environment.baseApiUrl + "/proposals";
    let storeToken: Token;
    storeToken = this.authService.getTokenData();
    const key: string = storeToken ? storeToken.tokenId || "" : "";
    // let header = new HttpHeaders({ 'content-type': 'application/x-www-form-urlencoded' });
    let header = new HttpHeaders({ 'DOLAPIKEY': key });
    return await this._http.post(url, { headers: header }).toPromise();
}
}
