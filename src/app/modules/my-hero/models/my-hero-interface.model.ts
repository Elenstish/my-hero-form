export interface MyHeroNode {
  name: string;
  groupName: string;
  propertyId: string;
  type: BaseType;
  synonyms: string | null;
  description: string | null;
  isCustom: boolean | null;
}

export interface BaseType {
  typeName: string;
  format: string;
  isNegative: boolean;
  minLength: number;
  maxLength: number;
  options?: string[];
}

export interface MyHeroName {
  name: string;
}

interface MyHeroExpanded {
  isExpanded?: boolean;
}

export type MyHeroList = MyHeroNode[] & MyHeroExpanded;

export interface MyHero extends MyHeroNode {
  isClone: boolean;
}

export interface MyHeroType {
  typeName: string;
  typeLabel: string;
}

export interface MyHeroAfterCloseValue {
  name: string;
  isClone: boolean;
}

export interface MyHeroValidationError {
  message: string;
  property: string;
}
