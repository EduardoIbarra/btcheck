import { BtwebPage } from './app.po';

describe('btweb App', () => {
  let page: BtwebPage;

  beforeEach(() => {
    page = new BtwebPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
