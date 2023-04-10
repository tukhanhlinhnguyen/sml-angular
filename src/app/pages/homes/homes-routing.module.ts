import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// Component
import { IndexComponent } from './index/index.component';
import { ElectronicsComponent } from './electronics/electronics.component';
import { FashionStoreV2Component } from './fashion-store-v2/fashion-store-v2.component';
import { SingleStoreComponent } from './single-store/single-store.component';

const routes: Routes = [
    {
        path: 'fashion-store-v1', component: IndexComponent
    },
    {
        path: 'electronics', component: ElectronicsComponent
    },
    {
        path: 'fashion-store-v2', component: FashionStoreV2Component
    },
    {
        path: 'single-store', component: SingleStoreComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomesRoutingModule { }
