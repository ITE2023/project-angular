import { formatDate } from '@angular/common';
export class DateTimeHelper {

    static shortFormat(value) {
        // tslint:disable-next-line:one-variable-per-declaration
        let d = new Date(value),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            // tslint:disable-next-line: prefer-const
            year = d.getFullYear();

        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }

        return [day, month, year].join('-');
    }

    static convertDateToStringByFormat(value: Date, format: string): string {
        return formatDate(value, format, 'en');
    }
}
