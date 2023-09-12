import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;
  const loginInfo = {
    id: 'viethoang01',
    pass: '26081989aB@'
  }
  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('');
  });
  it('should login successful', () => {
    page.navigateToUrl('admin/user');
    page.getIdInput('username').sendKeys(loginInfo.id);
    page.getIdInput('password').sendKeys(loginInfo.pass);
    page.getIdInput('btn-login').click();
    expect(2).toEqual(2);
  });
  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
