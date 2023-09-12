import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import {
  TranslateService,
  MissingTranslationHandler,
  MissingTranslationHandlerParams
} from "@ngx-translate/core";

import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { Observable } from "rxjs";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  // return new TranslateHttpLoader(http);
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

export class CustomMissingTranslationHandler
  implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams) {
    return "some value";
  }
}

@Injectable({
  providedIn: 'root'
})
export class LocalizeService {
  constructor(private translate: TranslateService) {}

  /**
   * Returns an array of currently available langs
   */
  public getLangs(): string[] {
    return this.translate.getLangs();
  }

  public setLang(language: string) {
    this.translate.setDefaultLang(language);
  }

  /**
   * Changes the lang currently used
   * @param language
   */
  public use(language: string): Observable<string> {
    return this.translate.use(language);
  }

  /**
   * Gets the instant translated value of a key (or an array of keys).
   * This method is synchronous and the default file loader is asynchronous.
   * You are responsible for knowing when your translations have been loaded
   * and it is safe to use this method. If you are not sure then you should use the get method instead.
   * @param key
   * @param interpolate
   */
  public instant(key: string | string[], interpolate?: any): string {
    return this.translate.instant(key, interpolate);
  }

  /**
   * Gets the translated value of a key (or an array of keys) or the key if the value was not found
   * @param key
   * @param interpolate
   */
  public get(key: string | string[], interpolate?: any): Observable<string> {
    return this.translate.get(key, interpolate);
  }

  /**
   * Returns the current browser lang if available, or undefined otherwise
   */
  public getBrowserLang(): string {
    return this.translate.getBrowserLang();
  }

  /**
   * Returns the current browser culture language name (e.g. "de-DE" if available, or undefined otherwise
   */
  public getBrowserCultureLang(): string {
    return this.translate.getBrowserCultureLang();
  }

  /**
   * Calls resetLang and retrieves the translations object for the current loader
   * @param language
   */
  public reloadLang(language: string): Observable<string> {
    return this.translate.reloadLang(language);
  }
}
