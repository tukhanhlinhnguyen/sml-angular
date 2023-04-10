import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component Pages
import {AboutComponent} from "./about/about.component";
import {ContactsComponent} from "./contacts/contacts.component";
import {HelpTopicsComponent} from "./help/help-topics/help-topics.component";
import {HelpSingleTopicComponent} from "./help/help-single-topic/help-single-topic.component";
import {HelpSubmitRequestComponent} from "./help/help-submit-request/help-submit-request.component";
import {SimpleComponent} from "./not-found/simple/simple.component";
import {IllustrationComponent} from "./not-found/illustration/illustration.component";
import { StickyFooterComponent } from './sticky-footer/sticky-footer.component';

const routes: Routes = [
  { path:"about", component:AboutComponent },
  { path:"contacts", component:ContactsComponent },
  { path:"topic", component:HelpTopicsComponent },
  { path:"single-topic", component:HelpSingleTopicComponent },
  { path:"submit-request", component:HelpSubmitRequestComponent },
  { path:"404-simple", component:SimpleComponent },
  { path:"404-illustration", component:IllustrationComponent },
  { path:"sticky-footer", component:StickyFooterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ExtraPagesRoutingModule { }
