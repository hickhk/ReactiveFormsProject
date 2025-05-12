import { AbstractControl, FormArray, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
import { AddressList } from "../../types/address-list";

export const requiredAddressValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    const addressGroup = control as FormGroup;
    const controlsToCheck = Object.keys(addressGroup.controls).filter((key) => key !== 'typedescription' && key !== 'type');
    const hasAnyText = controlsToCheck.some((key) => hasText(addressGroup.get(key)));

    for (const controlName of controlsToCheck) {
      const control = addressGroup.get(controlName);

    if(hasAnyText) {
        if(!control?.value) {
            control?.setErrors({requiredAddresControl: true});
            control?.markAsTouched();
            }
            else {
            control?.setErrors(null);
            }
        }
        else{
            control?.setErrors(null);
        }
    }
    return null;
};

const hasText = (control: AbstractControl | null): boolean => {
  return !!control && control.value && control.value.toString().trim().length > 0;
}