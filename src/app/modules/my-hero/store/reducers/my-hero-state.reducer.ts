import { ActionReducerMap } from '@ngrx/store';

import { myHeroListReducer } from "./my-hero-list.reducer";
import { MyHeroState } from "../models/my-hero-state.model";
import { createMyHeroSuccessReducer } from "./create-my-hero-success.reducer";
import { createMyHeroFailureReducer } from "./create-my-hero-failure.reducer";
import { myHeroListLoadingReducer } from "./my-hero-list-loading.reducer";
import { createMyHeroLoadingReducer } from "./create-my-hero-loading.reducer";

export const myHeroReducers: ActionReducerMap<MyHeroState> = {
  myHeroListState: myHeroListReducer,
  myHeroListLoadingState: myHeroListLoadingReducer,
  createMyHeroLoadingState: createMyHeroLoadingReducer,
  createMyHeroSuccessState: createMyHeroSuccessReducer,
  createMyHeroFailureState: createMyHeroFailureReducer
};
