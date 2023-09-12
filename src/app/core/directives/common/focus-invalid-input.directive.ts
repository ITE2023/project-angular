import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[appFirstFocus]'
})
export class FocusInvalidInputDirective {
  constructor(private el: ElementRef) { }

  @HostListener('submit')
  onFormSubmit() {
    const invalidElements = this.el.nativeElement.querySelectorAll('.form-field.ng-invalid');
    if (invalidElements.length > 0) {
      // if (invalidElements[0].nodeName === 'MAT-SELECT') {
      //   invalidElements[0].click();
      // } else {
      //   invalidElements[0].focus();
      // }
      invalidElements[0].focus();
    }
  }
}
