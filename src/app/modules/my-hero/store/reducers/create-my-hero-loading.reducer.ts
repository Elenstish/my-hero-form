import { Action, createReducer, on } from '@ngrx/store';

import {
  createMyHero,
  createMyHeroFailure,
  createMyHeroSuccess
} from "../actions";

const reducer = createReducer<boolean>(
    false,
    on(createMyHero, () => true),
    on(createMyHeroSuccess, () => false),
    on(createMyHeroFailure, () => false),
);

export function createMyHeroLoadingReducer(state: boolean, action: Action) {
  return reducer(state, action);
}
