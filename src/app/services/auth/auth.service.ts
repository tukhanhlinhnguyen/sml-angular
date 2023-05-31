import { Injectable } from "@angular/core";
import { HttpClient, HttpBackend, HttpHeaders } from "@angular/common/http";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { takeUntil } from 'rxjs/operators';
import { environment } from "src/environments/environment";
import { User } from "../../core/model/user.model";
import { Token } from "../../core/model/token.model";
import { Societe } from "src/app/core/model/Societe.model";

// import { User } from "../../models/user.model";
// import { Token } from "../../models/token.model";

// import { environment } from "src/environments/environment";

// import { UIService } from '../ui/ui.service';

declare const setChatUserInfo: any;

@Injectable()
export class AuthService {
    private _http: HttpClient;
    // isLoggedIn: Subject<boolean> = new Subject<boolean>();
    // email = new Subject<string>();
    email: string = "";
    loginUserStatusChanged = new Subject<User>();
    mycartChanged = new Subject<boolean>();
    loginStatusChanged = new Subject<boolean>();

    // loginUserStatusChanged = new Subject<User>();
    // serviceChanged = new Subject<Service>();

    // useCauseStatusChanged: Subject<number> = new Subject<number>();
    useCauseStatusChanged: Subject<boolean> = new Subject<boolean>();

    constructor(
        _handler: HttpBackend,
        // private http: HttpClient,
        // private _uiService: UIService,
        private _router: Router,
    ) {
        this._http = new HttpClient(_handler);
    }

    _completeUrl(url: any) {
        return environment.baseApiUrl + url;
        // return this.environment.baseApiUrl + url;
    }

    /**
     * Logins auth service
     * @param user
     * @param token
     * @returns
     */
    async login(user: User, token?: string) {
        const url = environment.baseApiUrl + '/login?login=' + user.username + '&password=' + user.password;

        // let header = new HttpHeaders({ 'content-type': 'application/x-www-form-urlencoded' });

        // return await this._http.get(url, { headers: header }).toPromise();
        return await this._http.get(url).toPromise();
    }


    // async socIDInfo(){
    //     let user: User = this.getUser();

    //     let sqlfilters = "(t.login:like:'" + user.username + "')"

    //     const url = environment.baseApiUrl + '/contacts?sortfield=t.rowid&sortorder=ASC&limit=100&sqlfilters=' + sqlfilters;

    //     let storeToken: Token;
    //     storeToken = this.getTokenData();

    //     const key: string = storeToken ? storeToken.tokenId || "" : "";

    //     // let header = new HttpHeaders({ 'content-type': 'application/x-www-form-urlencoded' });
    //     let header = new HttpHeaders({ 'DOLAPIKEY': key });

    //     return await this._http.get(url, { headers: header }).toPromise();
    // }

    async userInfo() {
        const url = environment.baseApiUrl + '/users/info';

        let storeToken: Token;
        storeToken = this.getTokenData();

        const key: string = storeToken ? storeToken.tokenId || "" : "";

        // let header = new HttpHeaders({ 'content-type': 'application/x-www-form-urlencoded' });
        let header = new HttpHeaders({ 'DOLAPIKEY': key });

        return await this._http.get(url, { headers: header }).toPromise();
    }

    async contactInfo() {
        // ?sortfield=t.rowid&sortorder=ASC&limit=100&sqlfilters=(t.email:like:'denis@maitrecooken.com')
        let user: User = this.getUser();

        let sqlfilters = "(t.email:like:'" + user.username + "')"

        const url = environment.baseApiUrl + '/contacts?sortfield=t.rowid&sortorder=ASC&limit=100&sqlfilters=' + sqlfilters;

        let storeToken: Token;
        storeToken = this.getTokenData();

        const key: string = storeToken ? storeToken.tokenId || "" : "";

        // let header = new HttpHeaders({ 'content-type': 'application/x-www-form-urlencoded' });
        let header = new HttpHeaders({ 'DOLAPIKEY': key });

        return await this._http.get(url, { headers: header }).toPromise();
    }

    async createProposal() {
        const url = environment.baseApiUrl + '/proposals';

        let user: User = this.getUser();
        let socId = localStorage.getItem("socId") || null;

        let body = {
            "socid": socId || "",
            // "date": "1672317842",
            "date": Date.now(),
            // "request_data": [
            //     // "121"
            // ]
        };

        let storeToken: Token;
        storeToken = this.getTokenData();

        const key: string = storeToken ? storeToken.tokenId || "" : "";

        // let header = new HttpHeaders({ 'content-type': 'application/x-www-form-urlencoded' });
        let header = new HttpHeaders({ 'DOLAPIKEY': key });

        return await this._http.post(url, body, { headers: header }).toPromise();
    }

    async createProposalLine(id: any, obj: any) {
        const url = environment.baseApiUrl + '/proposals/' + id + '/line';

        let user: User = this.getUser();
        let socId = localStorage.getItem("socId") || null;

        let body = {
            "fk_product": obj.id,
            "qty": obj.qty,
            "subprice": obj.price
        };

        let storeToken: Token;
        storeToken = this.getTokenData();

        const key: string = storeToken ? storeToken.tokenId || "" : "";

        // let header = new HttpHeaders({ 'content-type': 'application/x-www-form-urlencoded' });
        let header = new HttpHeaders({ 'DOLAPIKEY': key });

        return await this._http.post(url, body, { headers: header }).toPromise();
    }

    checkLogin(): boolean {
        if (localStorage.getItem("token_id")) {
            // this.isLoggedIn.next(true);
            // this.loginStatusChanged.next(true);
            return true;
        } else {
            // this.isLoggedIn.next(false);
            // this.loginStatusChanged.next(false);
            return false;
        }
    }

    async saveToken(response: any) {
        // let data: any = response.json();
        let data: any = response;
        var d = new Date();
        // this.token_expires = Date.now() + ((data.expires_in - 60) * 1000);
        // this.token_expires = (d.getTime() + (data.expires_in * 1000));

        let token_expires = d.getTime() + (data.expires_in - 60) * 1000;
        // let token_expires = (d.getTime() + ((data.expires_in - 3380) * 1000));

        // this.token_expires = (d.getTime() + ((60) * 1000));

        console.log('expiry:' + data.expires_in);

        localStorage.setItem("token_id", data.token);
        // localStorage.setItem("token_expiry_date", data.expiry_Date);
        // localStorage.setItem("token_expiry", token_expires.toString());
        // localStorage.setItem("refresh_token", data.refresh_token);
        // localStorage.setItem("token_type", data.token_type);
        localStorage.setItem("socid", data.socid)

        // this.loginStatusChanged.next(true);

        // setTimeout(function(){ this.logoutUser(); }, (data.expires_in * 1000));
        // console.log();

        // return data;
    }

    async saveSocID(response: any){
        let data: any = response;
        localStorage.setItem("socid", data.socid)
    }

    getSocIDData(): Societe{
        const societe = new Societe();

        societe.socID = localStorage.getItem("socid") || "";
        
        return societe;
    }

    getTokenData(): Token {
        const token = new Token();

        token.tokenId = localStorage.getItem("token_id") || "";
        token.tokenExpiry = localStorage.getItem("token_expiry") || "";
        token.tokenExpiryData = localStorage.getItem("token_expiry_date") || "";
        token.refreshToken = localStorage.getItem("refresh_token") || "";
        token.tokenType = localStorage.getItem("token_type") || "";
        //token.societeID = localStorage.getItem("soc_id") || "";

        return token;
    }

    storeUser(user: User) {
        if (!user) {
            return;
        }

        localStorage.setItem("user", JSON.stringify(user));
        this.loginUserStatusChanged.next(user);
    }

    storeSocID(id:Societe){
        if(!id){
            return;
        }
        localStorage.setItem("id", JSON.stringify(id))
    }
    getUser(): User {
        if (localStorage.getItem("user")) {
            return JSON.parse(localStorage.getItem("user") || "");
        }
        return new User();
    }

    storeObj(key: string, data: any) {
        if (!data) {
            return;
        }

        localStorage.setItem(key, JSON.stringify(data));
    }

    getStoreObj(key: string): any {
        if (localStorage.getItem(key)) {
            return JSON.parse(localStorage.getItem(key) || "");
        }
        return null;
    }

    async logoutUser_() {
        let key = localStorage.getItem("token_id") || null;
        localStorage.clear();
        this.loginStatusChanged.next(false);
        this.loginUserStatusChanged.next(new User());
    }
    gotoHome(){
        this._router.navigate(['/grocery/product-catalog/all'])
      }
    
    gotoPage(login:boolean){
        if(login){
            this._router.navigate(['/grocery/product-catalog/all'])
        }
        else{
            this._router.navigate(['/grocery'])
        }
    }
    
}
