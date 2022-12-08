import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import { CreateMyHeroState, MyHeroState, MyHeroStateName } from "../../models/my-hero-state.model";
import { MyHeroNode } from "../../models/my-hero-interface.model";

export const selectMyHeroListState = createFeatureSelector<MyHeroState>(MyHeroStateName);
export const selectCreateMyHeroState = createFeatureSelector<CreateMyHeroState>(MyHeroStateName);

export const selectMyHeroList: MemoizedSelector<object, MyHeroNode[]> = createSelector(
    selectMyHeroListState,
  (state: MyHeroState): MyHeroNode[] => state.myHeroListState
);

export const selectCreateMyHeroSuccess = createSelector(
    selectCreateMyHeroState,
    (state: CreateMyHeroState) => state.id
);

export const selectCreateMyHeroError = createSelector(
    selectCreateMyHeroState,
    (state: CreateMyHeroState) => state.error
);
