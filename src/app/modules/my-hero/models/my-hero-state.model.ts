import {MyHeroNode} from "./my-hero-interface.model";

export const MyHeroStateName = 'myHero';

export interface MyHeroState {
  myHeroListState: MyHeroListState;
}

export interface MyHeroListState {
  isLoading: null | boolean,
  error: null | string,
  myHeroListState: MyHeroNode[];
}
