import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTooltipModule } from "@angular/material/tooltip";
import { TextFieldModule } from "@angular/cdk/text-field";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from '@angular/material/form-field';

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
    MatProgressBarModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatTooltipModule,
    TextFieldModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatFormFieldModule,
    MyHeroStoreModule
  ]
})
export class MyHeroModule { }
