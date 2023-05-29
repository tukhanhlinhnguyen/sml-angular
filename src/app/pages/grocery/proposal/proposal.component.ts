import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

// Data Get
// import { catalog } from './data';
// import { ProposalModel, ProductModel } from './proposal.model';
import { ProposalModel } from './proposal.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { CartService } from '../../../services/cart/cart.service';
import { ProposalService } from './proposal.service';

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.scss'],
  providers: []
})
export class ProposalComponent implements OnInit {

  breadCrumbItems: any;
  proposals: any;
  loading: boolean = false;
  title:string;
  categoryId:any;
  public isCollapsed: boolean[] = [];
  // Table data
  CatelogList!: Observable<ProposalModel[]>;
  // ProductList!: ProductModel[];
  ProductList!: ProposalModel[];
  total: Observable<number>;

  constructor(
    public authService: AuthService,
    public cartService: CartService,
    public router: Router,
    private route: ActivatedRoute,
    public service: ProposalService,
  ) {
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
      let res: any = await this.service.getProposal();
      if (res) {
        console.log('res:', res)
        this.proposals=res
        this.loading = false
      }

    } catch (error) {
      console.log("error", error);  
      this.loading = false
    }
  }

}
