import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {MyHeroListComponent} from "./components/my-hero-list/my-hero-list.component";

const myHeroRoutes: Routes = [
    {
        path: '',
        component: MyHeroListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(myHeroRoutes)],
    exports: [RouterModule]
})

export class MyHeroRoutingModule {}
