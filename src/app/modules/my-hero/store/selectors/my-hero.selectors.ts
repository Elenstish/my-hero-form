import { HttpErrorResponse } from "@angular/common/http";
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

import { MyHeroState, MyHeroStateName } from "../../models/my-hero-state.model";
import { MyHeroNode } from "../../models/my-hero-interface.model";

export const selectMyHeroListState = createFeatureSelector<MyHeroState>(MyHeroStateName);

export const selectMyHeroList: MemoizedSelector<object, MyHeroNode[]> = createSelector(
    selectMyHeroListState,
  (state: MyHeroState): MyHeroNode[] => state.myHeroListState
);

export const selectMyHeroListLoading = createSelector(
    selectMyHeroListState,
    (state: MyHeroState): boolean => state.myHeroListLoadingState
);

export const selectCreateMyHeroSuccess = createSelector(
    selectMyHeroListState,
    (state: MyHeroState): boolean => state.createMyHeroSuccessState
);

export const selectCreateMyHeroFailure = createSelector(
    selectMyHeroListState,
    (state: MyHeroState): HttpErrorResponse => state.createMyHeroFailureState
);

export const selectCreateMyHeroLoading = createSelector(
    selectMyHeroListState,
    (state: MyHeroState): boolean => state.createMyHeroLoadingState
);
