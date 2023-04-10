import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Component
import { SharedModule } from "../../shared/shared.module";
import { NavbarRoutingModule } from './navbar-routing.module';
import { Level1LightComponent } from './level1-light/level1-light.component';
import { Level1DarkComponent } from './level1-dark/level1-dark.component';
import { Level2LightComponent } from './level2-light/level2-light.component';
import { Level2DarkComponent } from './level2-dark/level2-dark.component';
import { Level3DarkComponent } from './level3-dark/level3-dark.component';
import { Level3LightComponent } from './level3-light/level3-light.component';

@NgModule({
  declarations: [
    Level1LightComponent,
    Level1DarkComponent,
    Level2LightComponent,
    Level2DarkComponent,
    Level3DarkComponent,
    Level3LightComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NavbarRoutingModule
  ]
})
export class NavbarModule { }
