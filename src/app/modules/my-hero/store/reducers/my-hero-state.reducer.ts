import { ActionReducerMap } from '@ngrx/store';

import { myHeroReducer } from "./my-hero.reducer";
import { MyHeroState } from "../../models/my-hero-state.model";

export const myHeroReducers: ActionReducerMap<MyHeroState> = {
  myHeroListState: myHeroReducer
};
