const locators = Cypress.env("locators");

class HomePage {
  getLogo = () => cy.get(locators.idLinkLogo);
  getHome = () => cy.get(locators.cssLinkHome);
  getContact = () => cy.get(locators.cssLinkContact);
  getAboutus = () => cy.get(locators.cssLinkAboutus);
  getCart = () => cy.get(locators.idLinkCart);
  getLogin = () => cy.get(locators.idLinkLogin);
  getSignup = () => cy.get(locators.idLinkSignup);
  getLogout = () => cy.get(locators.idLinkLogout);
  getUserName = () => cy.get(locators.idLinkUserName);
  getCarouselLeftArrow = () => cy.get(locators.classLinkCarouselLeftArrow);
  getCarouselRightArrow = () => cy.get(locators.classLinkCarouselRightArrow);
  getCarouselImages = () => cy.get(locators.cssCarouselImages);
  getCarouselPositionIndicators = () =>
    cy.get(locators.cssCarouselPositionIndicators);
  getPhonesCategory = () => cy.get(locators.cssPhonesCategory);
  getLaptopsCategory = () => cy.get(locators.cssLaptopsCategory);
  getMonitorsCategory = () => cy.get(locators.cssMonitorsCategory);
  getProductImages = () => cy.get(locators.classProductImages);
  getProductTitles = () => cy.get(locators.classProductTitles);
  getPreviousButton = () => cy.get(locators.idPreviousButton);
  getNextButton = () => cy.get(locators.idNextButton);

  getUrl = () => cy.url();
  getTitle = () => cy.title();
  goMainUrl = () => cy.visit("/");

  clickLogo() {
    this.getLogo().click();
  }
  clickHome() {
    this.getHome().click();
  }
  clickContact() {
    this.getContact().click();
  }
  clickAboutus() {
    this.getAboutus().click();
  }
  clickCart() {
    this.getCart().click();
  }
  clickLogin() {
    this.getLogin().click();
  }
  clickSignup() {
    this.getSignup().click();
  }
  clickLogout() {
    this.getLogout().click();
  }
  clickUserName() {
    this.getUserName().click();
  }
  clickCarouselLeftArrow() {
    this.getCarouselLeftArrow().click();
  }
  clickCarouselRightArrow() {
    this.getCarouselRightArrow().click();
  }
  getCarouselImage(number) {
    return this.getCarouselImages().eq(number);
  }
  clickCarouselPositionIndicators(number) {
    this.getCarouselPositionIndicators().eq(number).click();
  }
  clickPhonesCategory() {
    this.getPhonesCategory().click();
  }
  clickLaptopsCategory() {
    this.getLaptopsCategory().click();
  }
  clickMonitorsCategory() {
    this.getMonitorsCategory().click();
  }
  clickProductImages(number) {
    this.getProductImages().eq(number).click();
  }
  clickProductTitles(number) {
    this.getProductTitles().eq(number).click();
  }
  clickPreviousButton() {
    this.getPreviousButton().click();
  }
  clickNextButton() {
    this.getNextButton().click();
  }
}
export default HomePage;
