import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: 'grocery', loadChildren: () => import('./grocery/grocery.module').then(m => m.GroceryModule)
    },
    { path: '**', redirectTo: 'grocery' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
