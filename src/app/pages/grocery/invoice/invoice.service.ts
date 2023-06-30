/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Injectable, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
    let catId = 210
    let queryParams = new HttpParams();
    queryParams = queryParams.append("thirdparty_ids", catId);
    queryParams = queryParams.append("sortorder", "DESC");

    let storeToken: Token;
    storeToken = this.authService.getTokenData();

    //TODO REMOVE HARD CODE TOKEN
    let dkey = "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";
    //const key: string = storeToken ? storeToken.tokenId || dkey : dkey;

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

    //TODO REMOVE HARD CODE TOKEN
    let dkey = "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";
    //const key: string = storeToken ? storeToken.tokenId || dkey : dkey;

    let header = new HttpHeaders({ 'DOLAPIKEY': dkey });

    // return this.httpClient.get(this.baseUrl + '/products').toPromise();
    return await this.httpClient.get(url, { headers: header, params:queryParams });
  }
}
