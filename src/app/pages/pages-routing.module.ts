import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: '', loadChildren: () => import('./homes/homes.module').then(m => m.HomesModule)
    },
    {
        path: 'shop', loadChildren: () => import('./shops/shops.module').then(m => m.ShopsModule)
    },
    {
        path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
    },
    {
        path: 'pages', loadChildren: () => import('./extra-pages/extra-pages.module').then(m => m.ExtraPagesModule)
    },
    {
        path: 'blogs', loadChildren: () => import('./blogs/blogs.module').then(m => m.BlogsModule)
    },
    {
        path: 'navbar', loadChildren: () => import('./navbar/navbar.module').then(m => m.NavbarModule)
    },
    {
        path: 'grocery', loadChildren: () => import('./grocery/grocery.module').then(m => m.GroceryModule)
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
