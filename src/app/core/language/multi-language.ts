import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';

export class MultiTranslateHttpLoader implements TranslateLoader {

  constructor(private http: HttpClient,
    // tslint:disable-next-line: align
    public resources = []) { }

  /**
   * Gets the translations from the server
   * @param lang
   * @returns {any}
   */
  public getTranslation(lang: string): any {
    return Observable.forkJoin(this.resources.map(config => {
      return this.http.get(`./assets/i18n/${lang}/${config}.json`);
    })).map(response => {
      return response.reduce((a, b) => {
        return Object.assign(a, b);
      });
    });
  }
}
