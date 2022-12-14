import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { MatSnackBar } from "@angular/material/snack-bar";

import * as actions from '../actions/my-hero.actions';
import { MyHeroApiService } from "../services/api/my-hero-api.service";
import { MyHeroName, MyHeroNode } from "../../models/my-hero-interface.model";

@Injectable()

export class MyHeroEffects {
  public createMyHero$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(actions.createMyHero),
        exhaustMap(({ payload }) => this.myHeroApiService.createMyHero(payload)
          .pipe(
            map((name: MyHeroName) => actions.createMyHeroSuccess(name)),
            catchError((error: HttpErrorResponse) => of(actions.createMyHeroFailure({ error })))
          )
        )
      )
  );

  public getMyHeroList$ = createEffect(() => this.actions$
    .pipe(
      ofType(actions.getMyHeroList),
      exhaustMap(() =>
        this.myHeroApiService.getMyHeroList()
          .pipe(
            map((list: MyHeroNode[]) =>
                actions.getMyHeroListSuccess({ items: list })
              ),
            catchError((error: HttpErrorResponse) => of(actions.getMyHeroListFailure({ error })))
          )
      )
    )
  );

  public getToaster$ = createEffect(() =>
      this.actions$
        .pipe(
          ofType(...[
            actions.createMyHeroSuccess,
          ]),
          tap((action) => {
            this.snackBar.open(
              `${action.name} Element was successfully added`,
              'x',
              { duration: 5000 }
            );
          }),
        ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private myHeroApiService: MyHeroApiService,
    private snackBar: MatSnackBar
  ) {}
}
