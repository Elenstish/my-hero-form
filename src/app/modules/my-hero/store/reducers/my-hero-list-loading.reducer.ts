import { Action, createReducer, on } from '@ngrx/store';

import { getMyHeroList, getMyHeroListFailure, getMyHeroListSuccess } from "../actions";

const reducer = createReducer<boolean>(
    false,
    on(getMyHeroList, () => true),
    on(getMyHeroListSuccess, () => false),
    on(getMyHeroListFailure, () => false),
);

export function myHeroListLoadingReducer(state: boolean, action: Action) {
  return reducer(state, action);
}
