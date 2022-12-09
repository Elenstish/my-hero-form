import {
  AbstractControl,
  FormControl,
  FormGroupDirective,
  NgForm,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';
import { ErrorStateMatcher } from "@angular/material/core";

export const MatchingValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const minLength = control.get('minLength').value;
  const maxLength = control.get('maxLength').value;

  return minLength <= maxLength ? null : { incorrect: true };
};

export class ComparisonErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent?.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent) && (control?.touched ?? false);
  }
}
