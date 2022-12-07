import {MyHeroNode} from "../models/my-hero-interface.model";

export const MyHeroList: MyHeroNode[] = [
  {
    name: 'Deal name',
    groupName: 'Deal Overview',
    propertyId: 'deal_overview.deal_name',
    type: {
      typeName: 'Single-line text',
      format: null,
      isNegative: null,
      minLength: null,
      maxLength: null
    },
    synonyms: 'title',
    description: 'Deal name display',
    isCustom: false
  },
  {
    name: 'Price',
    groupName: 'Deal Overview',
    propertyId: 'deal_overview.price',
    type: {
      typeName: 'Single-line text',
      format: null,
      isNegative: null,
      minLength: null,
      maxLength: null
    },
    synonyms: 'cost, value',
    description: 'the price of deal is display',
    isCustom: false
  },
  {
    name: 'deal currency type',
    groupName: 'Deal Overview',
    propertyId: 'deal_overview.deal_currency_type',
    type: {
      typeName: 'List',
      format: null,
      isNegative: null,
      minLength: null,
      maxLength: null,
      options: ['USD', 'EUR', 'UAH', 'ETH', 'BTC', 'ZLT', 'GBP', 'AFN',	'ALL', 'DZD', 'AOA', 'XCD', 'ARS']
    },
    synonyms: 'note, money, name of the money',
    description: 'the currency of deal is display',
    isCustom: false
  },
  {
    name: 'deal currency',
    groupName: 'Deal Overview',
    propertyId: 'deal_overview.deal_date',
    type: {
      typeName: 'Currency',
      format: '1,000.00 / (1,000.00)',
      isNegative: null,
      minLength: null,
      maxLength: null
    },
    synonyms: 'value, note, money',
    description: null,
    isCustom: true
  },
  {
    name: 'deal date',
    groupName: 'Deal Overview',
    propertyId: 'deal_overview.deal_date',
    type: {
      typeName: 'Date picker',
      format: 'YYYY-MM-DD',
      isNegative: null,
      minLength: null,
      maxLength: null
    },
    synonyms: null,
    description: null,
    isCustom: true
  },
  {
    name: 'Deal name',
    groupName: 'Valuation Schema',
    propertyId: 'valuation_schema.deal_name',
    type: {
      typeName: 'Single-line text',
      format: null,
      isNegative: null,
      minLength: null,
      maxLength: null
    },
    synonyms: 'title',
    description: 'Deal name in valuation schema is displayed',
    isCustom: false
  },
  {
    name: 'Deal name',
    groupName: 'Waterfall Schema',
    propertyId: 'waterfall_schema.deal_name',
    type: {
      typeName: 'Single-line text',
      format: null,
      isNegative: null,
      minLength: null,
      maxLength: null
    },
    synonyms: 'title',
    description: 'Deal name in waterfall schema is displayed',
    isCustom: false
  },
  {
    name: 'Phone',
    groupName: 'Waterfall Schema',
    propertyId: 'waterfall_schema.phone',
    type: {
      typeName: 'Phone number',
      format: null,
      isNegative: null,
      minLength: null,
      maxLength: null
    },
    synonyms: 'telephone, number',
    description: 'Phone in waterfall schema is displayed',
    isCustom: true
  }
];
