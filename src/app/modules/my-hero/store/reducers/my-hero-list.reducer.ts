import { Action, createReducer, on } from '@ngrx/store';

import { getMyHeroListSuccess, getSearch } from "../actions";
import { MyHeroNode } from "../../models/my-hero-interface.model";

const initialState: MyHeroNode[] = [];
let myHeroList: MyHeroNode[] = [];

const reducer = createReducer<MyHeroNode[]>(
    initialState,
    on(getMyHeroListSuccess, (state, { items }) => {
      myHeroList = items;
      return items;
    }),
    on(getSearch, (state, { payload }) =>
      myHeroList.filter(item => item.name.toLowerCase().includes(payload.toLowerCase())
      || item.synonyms?.toLowerCase().includes(payload.toLowerCase())
      || item.description?.toLowerCase().includes(payload.toLowerCase()))
    )
);

export function myHeroListReducer(state: MyHeroNode[], action: Action) {
  return reducer(state, action);
}
