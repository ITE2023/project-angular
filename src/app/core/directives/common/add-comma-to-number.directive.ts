import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[appAddCommaToNumber]'
})
export class AddCommaToNumberDirective {
  private specialKeys = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Delete'];

  constructor(private el: ElementRef, private control: NgControl) { }

  @HostListener('input', ['$event']) onInput(event) {
    const val = event.target.value;
    if (val) {
      const tmp = +val.replace(/\D/g, '') + '';
      const str = val.slice(event.target.selectionStart);
      this.control.control.setValue(tmp.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
      event.target.selectionEnd = this.el.nativeElement.value.length - str.length;
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event) {
    const e = <KeyboardEvent>event;
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    if (
      // Allow: 8-Backspace, 9-Tab, 13-Enter, 27-Esc
      [8, 9, 13, 27].indexOf(e.keyCode) !== -1 ||
      // Allow: Ctrl+A
      (e.keyCode === 65 && e.ctrlKey === true) ||
      // Allow: Ctrl+C
      (e.keyCode === 67 && e.ctrlKey === true) ||
      // Allow: Ctrl+V
      (e.keyCode === 86 && e.ctrlKey === true) ||
      // Allow: Ctrl+X
      (e.keyCode === 88 && e.ctrlKey === true)
    ) {
      return;
    }
    const val = event.target.value;
    if (val.length > 18) {
      event.preventDefault();
    }
  }
}
