import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import { MyHeroListState, MyHeroStateName } from "../../models/my-hero-state.model";
import { MyHeroNode } from "../../models/my-hero-interface.model";

export const selectMyHeroState = createFeatureSelector<MyHeroListState>(MyHeroStateName);

export const selectMyHeroList: MemoizedSelector<object, MyHeroNode[]> = createSelector(
    selectMyHeroState,
  (state: MyHeroListState): MyHeroNode[] => state.myHeroListState
);

export const selectMyHeroListIsLoading = createSelector(
    selectMyHeroState,
    (state: MyHeroListState) => state.isLoading
);

export const selectMyHeroListError = createSelector(
    selectMyHeroState,
    (state: MyHeroListState) => state.error
);
