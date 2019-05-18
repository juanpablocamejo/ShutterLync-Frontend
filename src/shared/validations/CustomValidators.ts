import * as moment from 'moment';
import { AbstractControl } from '@angular/forms';

export class CustomValidators {
    static date(AC: AbstractControl) {
        if (AC && AC.value && !moment(AC.value, 'YYYY-MM-DD', true).isValid()) {
            return { dateVaidator: true };
        }
        return null;
    }
}

