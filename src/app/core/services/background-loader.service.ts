import { Injectable } from '@angular/core';

@Injectable()

export class BackgroundLoader {

  loader: any;
  isShowing: boolean;
  isAlwaysShow: boolean;

  constructor() {
    this.loader = document.querySelector('#loadingWrapper');
  }

  show() {
    if (this.loader) {
      this.loader.style.display = 'block';
      this.loader.classList.add('d-flex');
      this.isShowing = true;
    }
  }

  hide() {
    if (this.loader) {
      this.loader.style.display = 'none';
      this.loader.classList.remove('d-flex');
      this.isShowing = false;
    }
  }
}
