import { Injectable } from "@angular/core";
import { HttpClient, HttpBackend, HttpHeaders, HttpParams } from "@angular/common/http";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { User } from "../../core/model/user.model";
import { Token } from "../../core/model/token.model";
import { CookieService } from "../cookie/cookie.service";

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
    useCauseStatusChanged: Subject<boolean> = new Subject<boolean>();
    creditNoteChanged = new Subject<any>();

    constructor(
        _handler: HttpBackend,
        // private http: HttpClient,
        // private _uiService: UIService,
        private _router: Router,
        private cookieService: CookieService
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
        return await this._http.get(url).toPromise();
    }

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
        let token_expires = d.getTime() + (data.expires_in - 60) * 1000;
        localStorage.setItem("token_id", data.token);
        // localStorage.setItem("token_expiry_date", data.expiry_Date);
        // localStorage.setItem("token_expiry", token_expires.toString());
        // localStorage.setItem("refresh_token", data.refresh_token);
        // localStorage.setItem("token_type", data.token_type);
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

    getUser(): User {
        if (localStorage.getItem("user")) {
            return JSON.parse(localStorage.getItem("user") || "");
        }
        return new User();
    }

    storeObj(key: string, data: any) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    storeInt(key: string, data: any) {
        localStorage.setItem(key, data);
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
        this.cookieService.deleteCookie("retake_order_asked")
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

    getthirdparty_ids():any {
        return localStorage.getItem("socid");
    }

    async saveCreditNote() {
        let storeToken: Token;
        storeToken = this.getTokenData();
        const key: string = storeToken ? storeToken.tokenId || "" : "";
        let params = new HttpParams()
            .set("sortorder","DESC")
            .set("limit", 1)
            .set("sqlfilters", "(t.type:=:2)"); //Create new HttpParams
        const headers = new HttpHeaders({ 'DOLAPIKEY': key });

        const url = environment.baseApiUrl + '/invoices';
        await this._http.get(url, {headers:headers, params:params}).subscribe({
            next: async (res:any) => {
                console.log('res:', res)
                if(res){
                    await localStorage.setItem("credit_note", JSON.stringify(res[0]));
                    this.creditNoteChanged.next(res[0]);
                };
            },
            error:(err) => {
            console.error(err)
            },
        })        
    }

    getCreditNote() {
        return localStorage.getItem("credit_note") ? JSON.parse(localStorage.getItem("credit_note") || "") : "";
    }
    
}
