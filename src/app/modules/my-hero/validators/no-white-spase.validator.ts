import { FormControl, ValidationErrors } from '@angular/forms';

export function noWhitespaceValidator(control: FormControl): ValidationErrors {
    const isValid: boolean = control.value
        ? control.value.trim().length !== 0
        : true;

    return isValid
        ? null
        : { required: true };
}
