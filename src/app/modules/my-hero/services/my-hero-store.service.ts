import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MyHeroState } from "../models/my-hero-state.model";
import { MyHeroNode } from "../models/my-hero-interface.model";
import { createMyHero, getMyHeroList, getSearch } from "../store/actions";
import {
  selectCreateMyHeroFailure, selectCreateMyHeroLoading,
  selectCreateMyHeroSuccess,
  selectMyHeroList,
  selectMyHeroListLoading
} from "../store/selectors";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MyHeroStoreService {

  constructor(
    private store: Store<MyHeroState>
  ) { }

  public createMyHero(myHero: MyHeroNode): void {
    console.log('createMyHero', myHero);
    this.store.dispatch(createMyHero({ payload: myHero }));
  }

  public createMyHeroSuccessAction$(): Observable<boolean> {
    return this.store.pipe(select(selectCreateMyHeroSuccess));
  }

  public createMyHeroFailureAction$(): Observable<HttpErrorResponse> {
    return this.store.pipe(select(selectCreateMyHeroFailure));
  }

  public createMyHeroProgress$(): Observable<boolean> {
    return this.store.pipe(select(selectCreateMyHeroLoading));
  }

  public getMyHeroList(): void {
    this.store.dispatch(getMyHeroList());
  }

  public selectMyHeroList$(): Observable<MyHeroNode[]> {
    return this.store.pipe(select(selectMyHeroList));
  }

  public getMyHeroListProgress$(): Observable<boolean> {
    return this.store.pipe(select(selectMyHeroListLoading));
  }

  public getSearch(search: string): void {
    this.store.dispatch(getSearch({ payload: search }));
  }
}
