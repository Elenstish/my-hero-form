import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const MatchingValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const minLength = control.get('minLength').value;
  const maxLength = control.get('maxLength').value;
  return minLength <= maxLength ? null : { incorrect: true };
};
