import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    // since auth gaurd is enabled, home page will actually be /unauthorized
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root p.greeting')).getText() as Promise<string>;
  }
}
