import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/search-page');
  }

  getPageTitle() {
    return element(by.css('ion-title')).getText();
  }
}
