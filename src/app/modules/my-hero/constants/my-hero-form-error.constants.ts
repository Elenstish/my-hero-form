import { DescriptionTextMaxLength, StandardInputMaxLength } from "../validators/validation.constants";
import { PredefinedValidationMessages } from "../validators/validation.models";

export const MyHeroFomFieldErrors: PredefinedValidationMessages = {
  name: {
    required: 'Name is required',
    maxlength: `Name must be up to ${StandardInputMaxLength} symbols`
  },
  groupName: {
    required: 'Refers To is required',
    maxlength: `Refers To must be up to ${StandardInputMaxLength} symbols`
  },
  propertyId: {
    required: 'Invalid Data Element ID'
  },
  synonyms: {
    maxlength: `Search terms must be up to ${StandardInputMaxLength} symbols`
  },
  description: {
    maxlength: `Description must be up to ${DescriptionTextMaxLength} symbols`
  },
  type: {
    required: 'Type is incorrect'
  },
  typeName: {
    required: 'Type is required'
  },
  format: {
    required: 'Format is required'
  },
  minLength: {
    min: 'Length area',
    pattern: 'Min Length must be an integer',
    required: 'Min Length is required'
  },
  maxLength: {
    max: 'Length area',
    pattern: 'Max Length must be an integer',
    required: 'Max Length is required',
    incorrect: 'Invalid Data'
  },
  options: {
    required: 'List Option Name is required',
    maxlength: `Search terms must be up to ${StandardInputMaxLength} symbols`
  }
};

export const MyHeroPropertyIdError = 'This Data Element ID is already taken. The Data Element ID generated ' +
  'must be unique. Please enter a different [Element Name] or change the selection in the [Refers To] field to ' +
  'create a unique Data Element ID.';
