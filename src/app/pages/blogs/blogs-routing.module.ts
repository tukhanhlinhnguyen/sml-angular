import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component Pages
import {BlogListSidebarComponent} from './blog-list-sidebar/blog-list-sidebar.component';
import {BlogListComponent} from "./blog-list/blog-list.component";
import {BlogGridSidebarComponent} from "./blog-grid-sidebar/blog-grid-sidebar.component";
import { BlogGridComponent } from './blog-grid/blog-grid.component';
import {BlogSingleSidebarComponent} from "./blog-single-sidebar/blog-single-sidebar.component";
import {BlogSingleComponent} from "./blog-single/blog-single.component";

const routes: Routes = [
  { path:"list-sidebar", component:BlogListSidebarComponent},
  { path:"list", component:BlogListComponent},
  { path:"grid-sidebar", component:BlogGridSidebarComponent},
  { path:"grid", component:BlogGridComponent},
  { path:"single-sidebar", component:BlogSingleSidebarComponent},
  { path:"single", component:BlogSingleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BlogsRoutingModule { }
