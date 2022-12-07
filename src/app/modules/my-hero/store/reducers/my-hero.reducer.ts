import { Action, createReducer, on } from '@ngrx/store';

import { getMyHeroList, getMyHeroListFailure, getMyHeroListSuccess } from "../actions";
import { MyHeroListState } from "../../models/my-hero-state.model";

const initialState: MyHeroListState = {
  isLoading: false,
  error: null,
  myHeroListState: []
};

const reducer = createReducer<MyHeroListState>(
  initialState,
  on(getMyHeroList, (state): MyHeroListState => ({
      ...state,
      isLoading: true,
      myHeroListState: []
    })
  ),
  on(getMyHeroListSuccess, (state, { items }) => ({
      ...state,
      isLoading: false,
      myHeroListState: items
    })
  ),
  on(getMyHeroListFailure, (state): MyHeroListState => ({
      ...state,
      isLoading: false,
    })
  )
);

export function myHeroReducer(state: MyHeroListState, action: Action) {
  return reducer(state, action);
}
