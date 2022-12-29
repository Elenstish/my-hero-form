import { HttpErrorResponse } from "@angular/common/http";

import { MyHeroNode } from "../../models/my-hero-interface.model";

export const MyHeroStateName = 'myHero';

export interface MyHeroState {
  myHeroListState: MyHeroNode[];
  myHeroListLoadingState: boolean;
  createMyHeroLoadingState: boolean;
  createMyHeroSuccessState: boolean;
  createMyHeroFailureState: HttpErrorResponse;
}

export interface MyHeroListState {
  isLoading: boolean;
  error: null | string;
  myHeroListState: MyHeroNode[];
}
