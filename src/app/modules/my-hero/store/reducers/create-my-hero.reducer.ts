import { Action, createReducer, on } from '@ngrx/store';

import { createMyHero, createMyHeroFailure, createMyHeroSuccess } from "../actions";
import { CreateMyHeroState } from "../../models/my-hero-state.model";

const initialState: CreateMyHeroState = {
    isLoading: false,
    error: null,
    id: null
};

const reducer = createReducer<CreateMyHeroState>(
  initialState,
  on(createMyHero, (state): CreateMyHeroState => ({
      ...state,
      isLoading: true,
      id: null
    })
  ),
  on(createMyHeroSuccess, (state, { id }) => ({
      ...state,
      isLoading: false,
      id: id
    })
  ),
  on(createMyHeroFailure, (state): CreateMyHeroState => ({
      ...state,
      isLoading: false,
    })
  )
);

export function createMyHeroReducer(state: CreateMyHeroState, action: Action) {
  return reducer(state, action);
}
