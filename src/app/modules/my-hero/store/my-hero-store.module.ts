import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from '@ngrx/effects';

import { MyHeroStateName } from "../models/my-hero-state.model";
import { myHeroReducers } from "./reducers";
import { MyHeroEffects } from "./effects";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(MyHeroStateName, myHeroReducers),
    EffectsModule.forFeature([MyHeroEffects])
  ]
})
export class MyHeroStoreModule { }
