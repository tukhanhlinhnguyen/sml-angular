import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component Pages
import {Level1LightComponent} from "./level1-light/level1-light.component";
import { Level1DarkComponent } from './level1-dark/level1-dark.component';
import { Level2LightComponent } from './level2-light/level2-light.component';
import { Level2DarkComponent } from './level2-dark/level2-dark.component';
import { Level3LightComponent } from './level3-light/level3-light.component';
import { Level3DarkComponent } from './level3-dark/level3-dark.component';

const routes: Routes = [
  { path:'level1-light',component:Level1LightComponent},
  { path:'level1-dark',component:Level1DarkComponent},
  { path:'level2-light',component:Level2LightComponent},
  { path:'level2-dark',component:Level2DarkComponent},
  { path:'level3-light',component:Level3LightComponent},
  { path:'level3-dark',component:Level3DarkComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class NavbarRoutingModule { }
