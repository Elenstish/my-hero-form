import { MyHeroNode } from "./my-hero-interface.model";

export const MyHeroStateName = 'myHero';

export interface MyHeroState {
  myHeroListState: MyHeroNode[];
  createMyHeroState: CreateMyHeroState;
}

export interface MyHeroListState {
  isLoading: boolean,
  error: null | string,
  myHeroListState: MyHeroNode[];
}

export interface CreateMyHeroState {
  isLoading: boolean,
  error: null | string,
  id: null | string;
}
