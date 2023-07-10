/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Injectable, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductModel } from 'src/app/core/model/product';
// import { CatalogModel, ProductModel } from './product-catalog.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Token } from 'src/app/core/model/token.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class InvoiceService {

  baseUrl: string = environment.baseApiUrl;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private route: ActivatedRoute,
    // private environment: environment
  ) {}

  async getInvoice() {
    let url = this.baseUrl + '/invoices';
    let catId = this.authService.getthirdparty_ids()
    let queryParams = new HttpParams();
    queryParams = queryParams.append("thirdparty_ids", catId);
    queryParams = queryParams.append("sortorder", "DESC");
    queryParams = queryParams.append("sqlfilters", "(t.type:=:0) and (t.fk_statut:>:0)");

    let storeToken: Token;
    storeToken = this.authService.getTokenData();

    let dkey = storeToken.tokenId;
    //const key: string = storeToken ? storeToken.tokenId || dkey : dkey;

    let header = new HttpHeaders({ 'DOLAPIKEY': dkey });

    // return this.httpClient.get(this.baseUrl + '/products').toPromise();
    return await this.httpClient.get(url, { headers: header, params:queryParams }).toPromise();
  }

  async getLatestInvoice(){
    let url = this.baseUrl + '/invoices'
    let catId = await this.authService.getthirdparty_ids()
    let queryParams = new HttpParams();
    queryParams = queryParams.append("thirdparty_ids", catId);
    queryParams = queryParams.append("sortorder", "DESC");
    queryParams = queryParams.append("limit", "1");
    queryParams = queryParams.append("sqlfilters", "(t.type:=:0) and (t.fk_statut:>:0)");

    let storeToken: Token;
    storeToken = this.authService.getTokenData();


    let dkey = storeToken.tokenId;
    let header = new HttpHeaders({ 'DOLAPIKEY': dkey });
    // return this.httpClient.get(this.baseUrl + '/products').toPromise();
    return await this.httpClient.get(url, { headers: header, params:queryParams }).toPromise();
  }

  convertDate(date:any){
    return new Date(date*1000).toLocaleDateString('fr-FR') // The 0 there is the key, which sets the date to the epoch
  }

  async downloadInvoice(file:any) {
    let url = this.baseUrl + '/documents/download';

    let queryParams = new HttpParams();
    queryParams = queryParams.append("modulepart", "facture");
    queryParams = queryParams.append("original_file", file);

    let storeToken: Token;
    storeToken = this.authService.getTokenData();

    let dkey = storeToken.tokenId;
    //const key: string = storeToken ? storeToken.tokenId || dkey : dkey;

    let header = new HttpHeaders({ 'DOLAPIKEY': dkey });

    // return this.httpClient.get(this.baseUrl + '/products').toPromise();
    return await this.httpClient.get(url, { headers: header, params:queryParams });
  }

  // Get product from a list ID
  async getProductFromIdsList(productIdsList:any[]){
    let url = this.baseUrl + '/products'
    let queryParams = new HttpParams();
    let sqlfilters = `(t.rowid:in:${productIdsList})`
    queryParams = queryParams.append("sqlfilters", sqlfilters);

    let storeToken: Token;
    storeToken = this.authService.getTokenData();


    let dkey = storeToken.tokenId;

    let header = new HttpHeaders({ 'DOLAPIKEY': dkey });

    // return this.httpClient.get(this.baseUrl + '/products').toPromise();
    return await this.httpClient.get(url, { headers: header, params:queryParams }).toPromise();
  
  }
}
