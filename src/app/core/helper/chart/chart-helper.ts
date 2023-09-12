export class ChartHelper {
    static genDateofTheMonth(thisMonth: boolean) {
        const d = new Date();
        const month = thisMonth ? d.getMonth() : d.getMonth() + 1;
        const dateofmonth = new Date(d.getFullYear(), month, 0).getDate();
        const dates = [];
        const lstExceptionDate = [3, 7, 11, 15, 19, 23, 27, 31];
        for (let i = 1; i <= dateofmonth; i++) {
            if (lstExceptionDate.includes(i)) {
                dates.push(`${i}/${month}`);
            } else {
                dates.push('');
            }
        }
        return dates;
    }
    static genFullDateofTheMonth(thisMonth: boolean) {
        const d = new Date();
        const month = thisMonth ? d.getMonth() : d.getMonth() + 1;
        const dateofmonth = new Date(d.getFullYear(), month, 0).getDate();
        const dates = [];
        for (let i = 1; i <= dateofmonth; i++) {
            dates.push(`${i}/${month}`);
        }
        return dates;
    }
    static genFullHourOfDay(currentHour: number) {
        const hours = [];
        for (let i = 1; i < currentHour + 1; i++) {
            if (i < 10) {
                hours.push(`0${i}:00 AM`);
            }
            if (i === 10 || i === 11) {
                hours.push(`${i}:00 AM`);
            }
            if (i > 11) {
                hours.push(`${i}:00 PM`);
            }
        }
        return hours;
    }
    static addDays(date, days) {
        // tslint:disable-next-line:prefer-const
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    static genFullDays(type: number) {
        const days = [];
        const date = new Date();
        for (let i = 1; i <= type; i++) {
            const temp = this.addDays(date, -i + 1);
            const day = temp.getDate();
            const month = temp.getMonth() + 1;
            days.push(`${day}/${month}`);
        }
        return days.reverse();
    }
    static genFullDays30(type: number) {
        const days = [];
        const date = new Date();
        for (let i = 0; i < type; i++) {
            const temp = this.addDays(date, -i);
            const day = temp.getDate();
            const month = temp.getMonth() + 1;
            days.push(`${day}/${month}`);
        }
        return days;
    }

}

