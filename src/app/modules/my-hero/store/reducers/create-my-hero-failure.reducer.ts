import { Action, createReducer, on } from '@ngrx/store';
import { HttpErrorResponse } from "@angular/common/http";

import { createMyHeroFailure } from "../actions";

const reducer = createReducer<HttpErrorResponse>(
  null,
  on(createMyHeroFailure, (state, { error }) => error)
);

export function createMyHeroFailureReducer(state: HttpErrorResponse, action: Action) {
  return reducer(state, action);
}
