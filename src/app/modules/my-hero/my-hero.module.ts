import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { MyHeroRoutingModule } from "./my-hero.routing-module";
import { myHeroReducers } from "./store/reducers";
import { MyHeroStateName } from "./models/my-hero-state.model";
import { MyHeroListComponent } from './components/my-hero-list/my-hero-list.component';
import { MyHeroDialogComponent } from './components/my-hero-dialog/my-hero-dialog.component';
import { MyHeroSectionComponent } from './components/my-hero-section/my-hero-section.component';
import { MyHeroFilterComponent } from './components/my-hero-filter/my-hero-filter.component';
import { MyHeroEffects } from "./store/effects";

@NgModule({
  declarations: [
    MyHeroListComponent,
    MyHeroDialogComponent,
    MyHeroSectionComponent,
    MyHeroFilterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MyHeroRoutingModule,
    MatProgressSpinnerModule,
    StoreModule.forFeature(MyHeroStateName, myHeroReducers),
    EffectsModule.forFeature([MyHeroEffects])
  ]
})
export class MyHeroModule { }
