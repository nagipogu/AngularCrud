import { Validator, NG_VALIDATORS, AbstractControl } from '@angular/forms';
import { Directive } from '@angular/core';


@Directive({
    selector: '[appConfirmEqualValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: ConfirmEqualValidatorDirective,
        multi: true
    }]
})
export class ConfirmEqualValidatorDirective implements Validator {
    validate(passWordGroup: AbstractControl): { [key:string]: any} | null {
       const passwordField = passWordGroup.get('password');
       const confirmPasswordField = passWordGroup.get('confirmPassword');
       if(passwordField && confirmPasswordField && passwordField.value !== confirmPasswordField.value){
           return {'notEqual': true}
       }
       return null;
    }
}