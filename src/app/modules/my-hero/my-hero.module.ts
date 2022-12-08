import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { MyHeroStoreModule } from "./store/my-hero-store.module";
import { MyHeroRoutingModule } from "./my-hero.routing-module";
import { MyHeroListComponent } from './components/my-hero-list/my-hero-list.component';
import { MyHeroDialogComponent } from './components/my-hero-dialog/my-hero-dialog.component';
import { MyHeroSectionComponent } from './components/my-hero-section/my-hero-section.component';
import { MyHeroFilterComponent } from './components/my-hero-filter/my-hero-filter.component';

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
    MyHeroStoreModule
  ]
})
export class MyHeroModule { }
