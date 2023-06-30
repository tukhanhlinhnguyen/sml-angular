/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Injectable, PipeTransform } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

// import { ProposalModel, ProductModel } from './product-catalog.model';
import { ProposalModel } from './proposal.model';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Token } from 'src/app/core/model/token.model';
import { AuthService } from 'src/app/services/auth/auth.service';

interface SearchResult {
  countries: ProposalModel[];
  total: number;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(countries: ProposalModel[]): ProposalModel[] {
  return countries;
}

function matches(country: ProposalModel, term: string, pipe: PipeTransform) {
  return country.id.toLowerCase().includes(term.toLowerCase())
    || country.title.toLowerCase().includes(term.toLowerCase())
    || country.category.toLowerCase().includes(term.toLowerCase())
    || country.price.toLowerCase().includes(term.toLowerCase())
    || country.type.toLowerCase().includes(term.toLowerCase())
}

@Injectable({ providedIn: 'root' })
export class ProposalService {
  baseUrl: string = environment.baseApiUrl;
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private route: ActivatedRoute,
    // private environment: environment
  ) {}

  async getProposal() {
    let url = this.baseUrl + '/proposals';
    //TODO CHANGE
    let thirdparty_ids = this.authService.getthirdparty_ids()
    let queryParams = new HttpParams();
    queryParams = queryParams.append("thirdparty_ids", thirdparty_ids);
    queryParams = queryParams.append("sortorder", "DESC");


    let storeToken: Token;
    storeToken = this.authService.getTokenData();

    //TODO REMOVE HARD CODE TOKEN
    const key: string = storeToken.tokenId;

    let header = new HttpHeaders({ 'DOLAPIKEY': key });
    return await this.httpClient.get(url, { headers: header, params:queryParams }).toPromise();
  }

  convertDate(date:any){
    return new Date(date*1000).toLocaleDateString('fr-FR') // The 0 there is the key, which sets the date to the epoch
  }

}
