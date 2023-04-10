import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbAccordionModule} from '@ng-bootstrap/ng-bootstrap';

// Scroll To
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

// Ng2 Search
import { Ng2SearchPipeModule } from 'ng2-search-filter';

// Component
import { SharedModule } from "../../shared/shared.module";
import { ExtraPagesRoutingModule } from "./extra-pages-routing.module";
import { AboutComponent } from './about/about.component';
import { ContactsComponent } from './contacts/contacts.component';
import { HelpTopicsComponent } from './help/help-topics/help-topics.component';
import { HelpSingleTopicComponent } from './help/help-single-topic/help-single-topic.component';
import { HelpSubmitRequestComponent } from './help/help-submit-request/help-submit-request.component';
import { SimpleComponent } from './not-found/simple/simple.component';
import { IllustrationComponent } from './not-found/illustration/illustration.component';
import { StickyFooterComponent } from './sticky-footer/sticky-footer.component';

@NgModule({
  declarations: [
    AboutComponent,
    ContactsComponent,
    HelpTopicsComponent,
    HelpSingleTopicComponent,
    HelpSubmitRequestComponent,
    SimpleComponent,
    IllustrationComponent,
    StickyFooterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbAccordionModule,
    ScrollToModule.forRoot(),
    Ng2SearchPipeModule,
    SharedModule,
    ExtraPagesRoutingModule
  ]
})
export class ExtraPagesModule { }
