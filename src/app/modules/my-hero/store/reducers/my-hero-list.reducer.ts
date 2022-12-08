import { Action, createReducer, on } from '@ngrx/store';

import { getMyHeroListSuccess } from "../actions";
import { MyHeroNode } from "../../models/my-hero-interface.model";

const initialState: MyHeroNode[] = [];

const reducer = createReducer<MyHeroNode[]>(
    initialState,
    on(getMyHeroListSuccess, (state, { items }) => items)
);

export function myHeroListReducer(state: MyHeroNode[], action: Action) {
  return reducer(state, action);
}
