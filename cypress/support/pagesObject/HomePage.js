const LOCATORS = require('../locators');

class HomePage {
  getLogo = () => cy.get(LOCATORS.idLinkLogo);
  getHome = () => cy.get(LOCATORS.cssLinkHome);
  getContact = () => cy.get(LOCATORS.cssLinkContact);
  getAboutus = () => cy.get(LOCATORS.cssLinkAboutus);
  getCart = () => cy.get(LOCATORS.idLinkCart);
  getLogin = () => cy.get(LOCATORS.idLinkLogin);
  getSignup = () => cy.get(LOCATORS.idLinkSignup);
  getLogout = () => cy.get(LOCATORS.idLinkLogout);
  getUserName = () => cy.get(LOCATORS.idLinkUserName);
  getCarouselLeftArrow = () => cy.get(LOCATORS.classLinkCarouselLeftArrow);
  getCarouselRightArrow = () => cy.get(LOCATORS.classLinkCarouselRightArrow);
  getCarouselImages = () => cy.get(LOCATORS.cssCarouselImages);
  getCarouselPositionIndicators = () => cy.get(LOCATORS.cssCarouselPositionIndicators);
  getPhonesCategory = () => cy.get(LOCATORS.cssPhonesCategory);
  getLaptopsCategory = () => cy.get(LOCATORS.cssLaptopsCategory);
  getMonitorsCategory = () => cy.get(LOCATORS.cssMonitorsCategory);
  getProductImages = () => cy.get(LOCATORS.classProductImages);
  getProductTitles = () => cy.get(LOCATORS.classProductTitles);
  getPreviousButton = () => cy.get(LOCATORS.idPreviousButton);
  getNextButton = () => cy.get(LOCATORS.idNextButton);
  
  goMainUrl = () => cy.visit("/");
  getUrl = () => cy.url();
  getTitle = () => cy.title();

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
  clickProductImage(number) {
    this.getProductImages().eq(number).click();
  }
  clickProductTitle(number) {
    this.getProductTitles().eq(number).click();
  }
  getProductTitle(number) {
    this.getProductTitles().eq(number).invoke("text");
  }
  getProductPrice(number) {
    this.getProductPrices().eq(number).invoke("text");
  }
  getProductDescription(number) {
    this.getProductDescriptions().eq(number).invoke("text");
  }
  clickPreviousButton() {
    this.getPreviousButton().click();
  }
  clickNextButton() {
    this.getNextButton().click();
  }
}
export default HomePage;
