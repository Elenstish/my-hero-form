import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'my-hero',
        pathMatch: 'full'
    },
    {
        path: 'my-hero',
        loadChildren: () => import('./modules/my-hero/my-hero.module').then(m => m.MyHeroModule),
        data: { preload: true, delay: false, title: 'My-Hero' }
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
