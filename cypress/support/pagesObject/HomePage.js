const LOCATORS = require('../locators');

class HomePage {
  getLogo = () => cy.get(LOCATORS.linkLogoId);
  getHome = () => cy.get(LOCATORS.linkHomeCss);
  getContact = () => cy.get(LOCATORS.linkContactCss);
  getAboutus = () => cy.get(LOCATORS.linkAboutusCss);
  getCart = () => cy.get(LOCATORS.linkCartId);
  getLogin = () => cy.get(LOCATORS.linkLoginId);
  getSignup = () => cy.get(LOCATORS.linkSignupId);
  getLogout = () => cy.get(LOCATORS.linkLogoutId);
  getUserName = () => cy.get(LOCATORS.linkUserNameId);
  getCarouselLeftArrow = () => cy.get(LOCATORS.linkCarouselLeftArrowClass);
  getCarouselRightArrow = () => cy.get(LOCATORS.linkCarouselRightArrowClass);
  getCarouselCurrentImage = () => cy.get(LOCATORS.carouselCurrentImageCss);
  getCarouselPositionIndicators = () => cy.get(LOCATORS.carouselPositionIndicatorsCss);
  getPhonesCategory = () => cy.get(LOCATORS.phonesCategoryCss);
  getLaptopsCategory = () => cy.get(LOCATORS.laptopsCategoryCss);
  getMonitorsCategory = () => cy.get(LOCATORS.monitorsCategoryCss);
  getProductImages = () => cy.get(LOCATORS.productImagesCss);
  getProductTitles = () => cy.get(LOCATORS.productTitlesClass);
  getProductPrices = () => cy.get(LOCATORS.productPricesCss);
  getProductDescriptions = () => cy.get(LOCATORS.productDescriptionsCss);
  getPreviousButton = () => cy.get(LOCATORS.previousButtonId);
  getNextButton = () => cy.get(LOCATORS.nextButtonId);
  
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
  getCarouselImage() {
    return this.getCarouselCurrentImage().invoke('attr', 'alt');
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
    return this.getProductTitles().eq(number).invoke("text");
  }
  getProductPrice(number) {
    return this.getProductPrices().eq(number).invoke("text");
  }
  getProductDescription(number) {
    return this.getProductDescriptions().eq(number).invoke("text");
  }
  clickPreviousButton() {
    this.getPreviousButton().click();
  }
  clickNextButton() {
    this.getNextButton().click();
  }
}
export default HomePage;
