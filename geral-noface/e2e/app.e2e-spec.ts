import { GeralNofacePage } from './app.po';

describe('geral-noface App', function() {
  let page: GeralNofacePage;

  beforeEach(() => {
    page = new GeralNofacePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
