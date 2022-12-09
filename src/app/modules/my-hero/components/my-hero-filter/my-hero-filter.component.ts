import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subject } from "rxjs";
import { filter, take, takeUntil } from "rxjs/operators";

import { MyHeroDialogComponent } from "../my-hero-dialog/my-hero-dialog.component";
import { MyHeroAfterCloseValue } from "../../models/my-hero-interface.model";


@Component({
  selector: 'app-my-hero-filter',
  templateUrl: './my-hero-filter.component.html',
  styleUrls: ['./my-hero-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyHeroFilterComponent implements OnInit, OnDestroy {
  @Output()
  searchChanged: EventEmitter<string> = new EventEmitter<string>();

  public filterForm: FormGroup;
  public searchControl: AbstractControl;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
      private fb: FormBuilder,
      private dialog: MatDialog,
      private snackBar: MatSnackBar
  ) { }

  public ngOnInit(): void {
    this.initForm();
    this.resetSearch();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public clear(): void {
    this.searchControl.setValue('');
    this.searchChanged.emit('');
  }

  public setSearch(): void {
    this.searchChanged.emit(this.searchControl.value);
  }

  public getControl(field: string): FormControl {
    return this.filterForm.get(field) as FormControl;
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
          if (data.isClone) {
            this.openMyFormDialog();
          }
          this.snackBar.open(
              `${data.name} Element was successfully added`,
              'x',
              { duration: 5000 }
              );
        });
  }

  private resetSearch(): void {
    this.searchControl.valueChanges.pipe(
        filter(search => !search),
        takeUntil(this.destroy$)
    ).subscribe(() => this.setSearch());
  }

  private initForm(): void {
    this.filterForm = this.fb.group({
      search: [{ value: '', disabled: true }]
    });

    this.searchControl = this.getControl('search');
  }
}
