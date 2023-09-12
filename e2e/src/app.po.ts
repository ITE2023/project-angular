import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }
  navigateToUrl(url: string) {
    return browser.get(url) as Promise<any>;
  }
  getIdInput(id: string) {
    return element(by.id(id));
  }
  getButtonLogin() {
    return element(by.css('btn-login'))
  }
  getTitleText() {
    return element(by.css('head title')).getText() as Promise<string>;
  }
}
