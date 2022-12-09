import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

import { MyHeroId, MyHeroNode } from "../../models/my-hero-interface.model";
import { getFailureType, getSuccessType } from "../constants/get-action-type.constants";

const myHeroActionTypes = {
  createMyHero: '[My Hero] Create My Hero',
  getMyHeroList: '[My Hero] Get My Hero List'
};

export const createMyHero = createAction(
  myHeroActionTypes.createMyHero,
  props<{ payload: MyHeroNode }>()
);

export const createMyHeroSuccess = createAction(
  getSuccessType(myHeroActionTypes.createMyHero),
  props<MyHeroId>()
);

export const createMyHeroFailure = createAction(
  getFailureType(myHeroActionTypes.createMyHero),
  props<{ error: HttpErrorResponse }>()
);

export const getMyHeroList = createAction(myHeroActionTypes.getMyHeroList);

export const getMyHeroListSuccess = createAction(
  getSuccessType(myHeroActionTypes.getMyHeroList),
  props<{ items: MyHeroNode[] }>()
);

export const getMyHeroListFailure = createAction(
  getFailureType(myHeroActionTypes.getMyHeroList),
  props<{ error: HttpErrorResponse }>()
);
