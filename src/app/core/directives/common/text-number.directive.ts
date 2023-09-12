import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[appTextNumber]'
})
export class TextNumberDirective {
  private specialKeys = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Delete', 'Space'];

  constructor(private el: ElementRef, private control: NgControl) { }

  @HostListener('input', ['$event']) onInput(event) {
    const val = event.target.value;
    if (val) {
      this.control.control.setValue(val.replace(/[^a-zA-Z0-9]*/g, ''));
    }
  }


  @HostListener('keydown', ['$event']) onKeyDown(event) {
    const e = <KeyboardEvent>event;
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    const k = e.keyCode;
    if (
      // Allow: 8-Backspace, 9-Tab, 13-Enter, 27-Esc, 32-Space
      [8, 9, 13, 27, 32].indexOf(k) !== -1 ||
      // Allow: Ctrl+A
      (k === 65 && e.ctrlKey === true) ||
      // Allow: Ctrl+C
      (k === 67 && e.ctrlKey === true) ||
      // Allow: Ctrl+V
      (k === 86 && e.ctrlKey === true) ||
      // Allow: Ctrl+X
      (k === 88 && e.ctrlKey === true)
    ) {
      return;
    }
    let specials = [',', '<', '>', '/', '?', ';', ':', '\'', '\"', '[', '{', ']', '}', '\\', '|', '`', '~', '!',
      '#', '$', '%', '^', '&', '*', '(', ')', '=', '+'];
    if (specials.indexOf(e.key) !== -1) {
      e.preventDefault();
    }
  }
}

