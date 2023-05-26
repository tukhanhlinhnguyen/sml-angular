/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Injectable, PipeTransform } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

// import { CatalogModel, ProductModel } from './product-catalog.model';
import { CatalogModel } from './product-catalog.model';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Token } from 'src/app/core/model/token.model';
import { AuthService } from 'src/app/services/auth/auth.service';

interface SearchResult {
  countries: CatalogModel[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  startIndex: number;
  endIndex: number;
  totalRecords: number;
  status: string;
  payment: string;
  date: string;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(countries: CatalogModel[]): CatalogModel[] {
  return countries;
}

function matches(country: CatalogModel, term: string, pipe: PipeTransform) {
  return country.id.toLowerCase().includes(term.toLowerCase())
    || country.title.toLowerCase().includes(term.toLowerCase())
    || country.category.toLowerCase().includes(term.toLowerCase())
    || country.price.toLowerCase().includes(term.toLowerCase())
    || country.type.toLowerCase().includes(term.toLowerCase())
}

@Injectable({ providedIn: 'root' })
export class ProductCatlogService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _countries$ = new BehaviorSubject<CatalogModel[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  // public productChanged = new Subject<ProductModel[]>();
  public productChanged = new Subject<CatalogModel[]>();

  content?: any;
  products?: any;

  private _state: State = {
    page: 1,
    pageSize: 8,
    searchTerm: '',
    startIndex: 0,
    endIndex: 9,
    totalRecords: 0,
    status: '',
    payment: '',
    date: '',
  };

  baseUrl: string = environment.baseApiUrl;

  constructor(
    private pipe: DecimalPipe,
    private httpClient: HttpClient,
    private authService: AuthService,
    private route: ActivatedRoute,
    // private environment: environment
  ) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._countries$.next(result.countries);
      this._total$.next(result.total);
    });

    this._search$.next();

    // Json Data
    // this.products = catalog;

    this.productChanged.subscribe(
      (products) => {
        // console.log("testing");
        this.products = products;
        console.log('this.products:', this.products)

        // this._search$.next();
      }
    );
  }

  get countries$() { return this._countries$.asObservable(); }
  get product() { return this.products; }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }
  get startIndex() { return this._state.startIndex; }
  get endIndex() { return this._state.endIndex; }
  get totalRecords() { return this._state.totalRecords; }
  get status() { return this._state.status; }
  get payment() { return this._state.payment; }
  get date() { return this._state.date; }

  set page(page: number) { this._set({ page }); }
  set pageSize(pageSize: number) { this._set({ pageSize }); }
  set searchTerm(searchTerm: string) { this._set({ searchTerm }); }
  set startIndex(startIndex: number) { this._set({ startIndex }); }
  set endIndex(endIndex: number) { this._set({ endIndex }); }
  set totalRecords(totalRecords: number) { this._set({ totalRecords }); }
  set status(status: any) { this._set({ status }); }
  set payment(payment: any) { this._set({ payment }); }
  set date(date: any) { this._set({ date }); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const datas = (this.product) ?? [];
    const { pageSize, page, searchTerm, status, payment, date } = this._state;

    // 1. sort
    let countries = sort(datas);

    // 2. filter
    countries = countries.filter(country => matches(country, searchTerm, this.pipe));
    // 5. Status Filter
    // if (status) {
    //   countries = countries.filter(country => country.status == status);
    // }
    // else {
    //   countries = countries;
    // }

    // 3. payment Filter
    // if (payment) {
    //   countries = countries.filter(country => country.payment == payment);
    // }
    // else {
    //   countries = countries;
    // }

    // 4. Date Filter       
    // if (date) {
    //   countries = countries.filter(country => this.datePipe.transform(country.orderDate, "yyyy-MM-dd") == this.datePipe.transform(date, "yyyy-MM-dd"));
    // }
    // else {
    //   countries = countries;
    // }

    const total = countries.length;

    // 3. paginate
    this.totalRecords = countries.length;
    this._state.startIndex = (page - 1) * this.pageSize + 1;
    this._state.endIndex = (page - 1) * this.pageSize + this.pageSize;
    if (this.endIndex > this.totalRecords) {
      this.endIndex = this.totalRecords;
    }
    countries = countries.slice(this._state.startIndex - 1, this._state.endIndex);
    return of({ countries, total });
  }

  async get_products() {
    let url = this.baseUrl + '/products';
    let catId = this.route.snapshot.params['id']
    let queryParams = new HttpParams();
    if(catId && catId !=="all"){
      queryParams = queryParams.append("category", catId);
    }

    let storeToken: Token;
    storeToken = this.authService.getTokenData();

    //TODO REMOVE HARD CODE TOKEN
    let dkey = "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";
    const key: string = storeToken ? storeToken.tokenId || dkey : dkey;

    let header = new HttpHeaders({ 'DOLAPIKEY': key });

    // return this.httpClient.get(this.baseUrl + '/products').toPromise();
    return await this.httpClient.get(url, { headers: header, params:queryParams }).toPromise();
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
