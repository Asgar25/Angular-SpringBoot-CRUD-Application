import { AbstractControl } from '@angular/forms';


// here we are creating seperate file for Validator for reusable purpose
export class CustomValidators {
    static emailDomain(control: AbstractControl):  { [key: string]: any } | null {

        const email: string = control.value;
        const domain = email.substring(email.lastIndexOf('@') +1);
        if (email == '' || domain.toLowerCase() === 'yahoo.com') {
          return null;
        } else {
          return { 'emailDomain': true };
        }
      }
}