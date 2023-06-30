import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DecimalPipe } from '@angular/common';

import { ProposalModel } from './proposal.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { CartService } from '../../../services/cart/cart.service';
import { PaginationService } from '../../../shared/pagination/pagination.service';
import { ProposalService } from './proposal.service';

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.scss'],
  providers: [PaginationService, DecimalPipe]
})
export class ProposalComponent implements OnInit {

  breadCrumbItems: any;
  proposals: any;
  loading: boolean = false;
  title:string;
  categoryId:any;
  public isCollapsed: boolean[] = [];
  // Table data
  ProposalListObservable!: Observable<ProposalModel[]>;
  // ProductList!: ProductModel[];
  ProposalList!: ProposalModel[];
  total: Observable<number>;

  constructor(
    public authService: AuthService,
    public cartService: CartService,
    public router: Router,
    private route: ActivatedRoute,
    public pService: ProposalService,
    public service: PaginationService,
  ) {
    this.ProposalListObservable = service.products$;
    this.total = service.total$;
  }

  ngOnInit(): void {

    // When the user clicks on the button, scroll to the top of the document
    document.documentElement.scrollTop = 0;
    this.getProposal()
    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'Home', link: '/grocery' },
      { label: 'Product catalog', active: true, link: '/grocery/proposal/all' }
    ];

    this.route.params.subscribe(routeParams => {
      this.title = routeParams.label ? routeParams.label : this.title
    });
  }

  // Go To Detail Page
  gotodetail(id: any) {
    this.router.navigate(['/grocery/single-product', {id:id, categoryId:this.categoryId, categoryLabel:this.title}])
  }

  updateCategoryTitle(event:any){
    this.title= event.label ? event.label : this.title
    this.categoryId=event.id
  }

  async getProposal() {
    this.proposals =[];
    this.loading=true;
    try {
      let res: any = await this.pService.getProposal();
      if (res) {
        console.log('res:', res)
        this.proposals=res
        this.total=this.proposals
        this.loading = false
      }
      if (res) {
        //this.catalogs=res
        this.service.productChanged.next(this.ProposalList);
        this.ProposalList = res || [];
        this.ProposalListObservable.subscribe(x => {
          this.proposals = Object.assign([], x);
          this.service.productChanged.next(this.ProposalList);
          setTimeout(() => {
            this.loading = false
          }, 500);
          // console.log("this.catalogs", this.catalogs);
        });
      }

    } catch (error) {
      console.log("error", error);  
      this.loading = false
    }
  }

}
