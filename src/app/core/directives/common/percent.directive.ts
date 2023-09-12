import { Directive, HostListener, ElementRef, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[appPercent]',
})
export class PercentDirective {

  // @Input() decimals = 0;
  private specialKeys = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Delete'];

  constructor(private el: ElementRef, private control: NgControl) {
  }

  @HostListener('input', ['$event']) onInput(event) {
    const val = event.target.value;
    const s = val.split('.');
    // format: x.xx hoặc xx.xx
    // sử dụng ngx-mask, maxlength = 5
    if (+s[0] < 10 && val.length > 4) {
      event.preventDefault();
      this.control.control.setValue(val.substr(0, 4));
    }
  }
}
