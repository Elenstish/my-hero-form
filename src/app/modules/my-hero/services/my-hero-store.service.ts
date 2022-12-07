import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MyHeroState } from "../models/my-hero-state.model";
import { MyHeroNode } from "../models/my-hero-interface.model";
import { createMyHero, getMyHeroList } from "../store/actions";
import {
  selectMyHeroList,
  selectMyHeroListError,
  selectMyHeroListIsLoading
} from "../store/selectors";


@Injectable({
  providedIn: 'root'
})
export class MyHeroStoreService {

  constructor(
    private store: Store<MyHeroState>
  ) { }

  public createMyHero(myHero: MyHeroNode): void {
    this.store.dispatch(createMyHero({ payload: myHero }));
  }

  public createMyHeroFailureAction$(): Observable<string | null> {
    return this.store.pipe(select(selectMyHeroListError));
  }

  public getMyHeroList(): void {
    this.store.dispatch(getMyHeroList());
  }

  public getMyHeroListProgress$(): Observable<boolean> {
    return this.store.pipe(select(selectMyHeroListIsLoading));
  }

  public selectMyHeroList$(): Observable<MyHeroNode[]> {
    return this.store.pipe(select(selectMyHeroList));
  }
}
