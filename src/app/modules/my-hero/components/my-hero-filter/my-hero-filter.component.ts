import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Subject } from "rxjs";
import { filter, take, takeUntil } from "rxjs/operators";

import { MyHeroDialogComponent } from "../my-hero-dialog/my-hero-dialog.component";
import { MyHeroAfterCloseValue, MyHeroNode } from "../../models/my-hero-interface.model";
import { MyHeroStoreService } from "../../store/services/my-hero-store.service";


@Component({
  selector: 'app-my-hero-filter',
  templateUrl: './my-hero-filter.component.html',
  styleUrls: ['./my-hero-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyHeroFilterComponent implements OnInit, OnDestroy {
  @Input()
  public myHeroList: MyHeroNode[];
  public searchControl: FormControl = new FormControl('');

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
      private dialog: MatDialog,
	  private myHeroStoreService: MyHeroStoreService
  ) {
  }

  public ngOnInit(): void {
    this.resetSearch();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public clear(): void {
    this.searchControl.setValue('');
    this.myHeroStoreService.getSearch(this.searchControl.getRawValue());
  }

  public setSearch(): void {
    this.myHeroStoreService.getSearch(this.searchControl.getRawValue());
  }

  public openMyFormDialog(): void {
    const dialogRef = this.dialog.open(MyHeroDialogComponent, {
      width: '590px'
    });

    dialogRef.afterClosed()
        .pipe(
            filter(data => !!data),
            take(1)
        )
        .subscribe((data: MyHeroAfterCloseValue) => {
          this.myHeroStoreService.getMyHeroList();

          if (data.isClone) {
            this.openMyFormDialog();
          }
        });
  }

  private resetSearch(): void {
    this.searchControl.valueChanges.pipe(
        filter(search => !search),
        takeUntil(this.destroy$)
    ).subscribe(() => this.setSearch());
  }
}
