import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'customCurrency' })
export class CustomCurrencyPipe implements PipeTransform {
    transform(value: number, currencyList: any): number {
        const item = currencyList.filter(i => +i.value === +value);
        return item[0].desc ? item[0].desc : '';
    }
}