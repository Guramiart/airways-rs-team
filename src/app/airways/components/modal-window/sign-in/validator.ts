import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function DateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = new Date(control.value);
    const today = new Date();
    value.setHours(today.getHours());
    return today <= value ? { dateValid: true } : null;
  };
}
