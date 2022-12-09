import { MyHeroType } from "../models/my-hero-interface.model";
import { PredefinedValidationMessages } from "../validators/validation.models";
import { StandardInputMaxLength } from "../validators/validation.constants";

type MyHeroOptionType = {
  [k in fieldTypes]: string[]
};

type MyHeroFieldTypes<k> = MyHeroOptionType;

export enum fieldTypes {
  DATE_PICKER = 'DatePicker',
  PERCENTAGE = 'Percentage',
  CURRENCY = 'Currency',
  NUMBER = 'Number',
  LIST = 'List',
  PHONE_NUMBER = 'Phone',
  EMAIL = 'Email',
  MULTILINE_TEXT = 'MultilineText',
  SINGLE_LINE_TEXT = 'SinglelineText'
}

export const MyHeroTypesName: MyHeroType[] = [
  {
    typeName: 'DatePicker',
    typeLabel: 'Date picker'
  },
  {
    typeName: 'Percentage',
    typeLabel: 'Percentage'
  },
  {
    typeName: 'Currency',
    typeLabel: 'Currency'
  },
  {
    typeName: 'Number',
    typeLabel: 'Number'
  },
  {
    typeName: 'List',
    typeLabel: 'List'
  },
  {
    typeName: 'Phone',
    typeLabel: 'Phone number'
  },
  {
    typeName: 'Email',
    typeLabel: 'Email'
  },
  {
    typeName: 'SinglelineText',
    typeLabel: 'Single-line text'
  },
  {
    typeName: 'MultilineText',
    typeLabel: 'Multiline text'
  }
];

export const MyHeroComponents: string[] = [
  'Deal Overview',
  'Valuation Schema',
  'Waterfall Schema',
  'Data Series Schema'
];

const MyHeroDateTypes: string[] = [
  'YYYY-MM-DD',
  'dd mmm yyyy',
  'dd.mm.yyyy',
  'dd.mm.yy',
  'mm.dd.yyyy',
  'mm.dd.yy',
  'dd/mm/yyyy',
  'dd/mm/yy',
  'mm/dd-yyyy',
  'mm-dd-yy',
  'dd-mm-yyyy',
  'dd-mm-yy',
  'mm-dd-yyyy',
  'mm-dd-yy',
  'dd.mm.yyyy + HH:MM AM/PM',
  'dd.mm.yy + HH:MM AM/PM',
  'mm.dd.yyyy + HH:MM AM/PM',
  'mm.dd.yy + HH:MM AM/PM',
  'dd.mm.yyyy + HH:MM',
  'dd.mm.yy + HH:MM',
  'mm.dd.yyyy + HH:MM',
  'mm.dd.yy + HH:MM'
];

const MyHeroNumberTypes: string[] = [
  '1,000.00 / (1,000.00)',
  '1 000.00 / (1 000.00)',
  '1 000.00 / -1 000.00',
  '1,000.00 / -1,000.00',
  '1 000 / (1 000)',
  '1,000 / (1,000)',
  '1 000 / -1 000',
  '1,000 / -1,000'
];

export const MyHeroFieldTypes: MyHeroFieldTypes<fieldTypes> = {
    [fieldTypes.DATE_PICKER]: MyHeroDateTypes,
    [fieldTypes.PERCENTAGE]: MyHeroNumberTypes,
    [fieldTypes.CURRENCY]: MyHeroNumberTypes,
    [fieldTypes.NUMBER]: MyHeroNumberTypes,
    [fieldTypes.LIST]: [],
    [fieldTypes.PHONE_NUMBER]: [],
    [fieldTypes.EMAIL]: [],
    [fieldTypes.MULTILINE_TEXT]: [],
    [fieldTypes.SINGLE_LINE_TEXT]: []
};

export const AddGroupFormFieldsErrors: PredefinedValidationMessages = {
  title: {
    required: 'Deal Name is required',
    maxlength: `Deal Name cannot be greater than ${StandardInputMaxLength} characters`,
    pattern: `Deal Name contains invalid special characters`
  }
};
