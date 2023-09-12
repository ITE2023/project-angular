import { NativeDateAdapter } from '@angular/material/core';
// import * as moment from 'moment';
export const MY_DATE_FORMATS = {
    parse: {
        dateInput: { month: 'numeric', year: 'numeric', day: 'numeric' }
    },
    display: {
        // dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
        dateInput: 'input',
        monthYearLabel: { year: 'numeric', month: 'numeric' },
        dateA11yLabel: { year: 'numeric', month: 'numeric', day: 'numeric' },
        monthYearA11yLabel: { year: 'numeric', month: 'numeric' },
    }
};
export class MyDateAdapter extends NativeDateAdapter {
    // tslint:disable-next-line:ban-types
    // format(date: Date, displayFormat: Object): string {
    //     moment.locale('vi-vi'); // Choose the locale
    //     // tslint:disable-next-line:prefer-const
    //     let formatString = (displayFormat === 'input') ? 'DD/MM/YYYY' : 'LLL';
    //     return moment(date).format(formatString);
    // }
}
