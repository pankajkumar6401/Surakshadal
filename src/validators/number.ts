import {FormControl} from '@angular/forms';

export class NumberValidator {

    static isValid(control: FormControl){
    var re = /^([\d]{10})+$/.test(control.value);
      

      if (re){
        return null;
      }

      return {"invalidNumber": true};
    }

}