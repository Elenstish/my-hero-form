import { Action, createReducer, on } from '@ngrx/store';

import { createMyHeroSuccess } from "../actions";

const reducer = createReducer<boolean>(
  null,
  on(createMyHeroSuccess, (state, { id }) => !!id)
);

export function createMyHeroSuccessReducer(state: boolean, action: Action) {
  return reducer(state, action);
}
