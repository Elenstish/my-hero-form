import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MyHeroState } from "../models/my-hero-state.model";
import { MyHeroNode } from "../models/my-hero-interface.model";
import { createMyHero, getMyHeroList } from "../store/actions";
import {
  selectCreateMyHeroError,
  selectCreateMyHeroSuccess,
  selectMyHeroList
} from "../store/selectors";
import { ActionsListenerService } from "./action-listener.service";

@Injectable({
  providedIn: 'root'
})
export class MyHeroStoreService {

  constructor(
      private actionsListener: ActionsListenerService,
    private store: Store<MyHeroState>
  ) { }

  public createMyHero(myHero: MyHeroNode): void {
    this.store.dispatch(createMyHero({ payload: myHero }));
  }

  public createMyHeroSuccessAction$(): Observable<string | null> {
    return this.store.pipe(select(selectCreateMyHeroSuccess));
  }

  public createMyHeroFailureAction$(): Observable<string | null> {
    return this.store.pipe(select(selectCreateMyHeroError));
  }

  public getMyHeroList(): void {
    this.store.dispatch(getMyHeroList());
  }

  public selectMyHeroList$(): Observable<MyHeroNode[]> {
    return this.store.pipe(select(selectMyHeroList));
  }

  public getMyHeroListProgress$(): Observable<boolean> {
    return this.actionsListener.getProgressStatus(getMyHeroList);
  }
}
