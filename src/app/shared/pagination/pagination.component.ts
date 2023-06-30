import { Component } from '@angular/core';
import { PaginationService } from './pagination.service';
import { Observable } from 'rxjs';
import { CatalogModel } from '../../pages/grocery/product-catalog/product-catalog.model';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})



export class PaginationComponent {

   // Table data
   CatelogList!: Observable<CatalogModel[]>;
   // ProductList!: ProductModel[];
   ProductList!: CatalogModel[];
   total: Observable<number>;

  constructor(
    public service: PaginationService) {
    this.CatelogList = service.products$;
    this.total = service.total$;
  }
}
