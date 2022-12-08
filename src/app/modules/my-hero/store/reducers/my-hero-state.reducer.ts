import { ActionReducerMap } from '@ngrx/store';

import { myHeroListReducer } from "./my-hero-list.reducer";
import { MyHeroState } from "../../models/my-hero-state.model";
import {createMyHeroReducer} from "./create-my-hero.reducer";

export const myHeroReducers: ActionReducerMap<MyHeroState> = {
  myHeroListState: myHeroListReducer,
  createMyHeroState: createMyHeroReducer
};
