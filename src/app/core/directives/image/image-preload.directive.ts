import { Directive, Input } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'img[default]',
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '(error)': 'updateUrl()',
    '[src]': 'src'
  }
})
export class ImagePreloadDirective {

  @Input() src: string;
  @Input() default: string;
  updateUrl() {
    this.src = this.default;
  }
}
