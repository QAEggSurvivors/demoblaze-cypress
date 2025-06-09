import HomePage from "./HomePage";

const LOCATORS = require('../locators');

class CardsPage extends HomePage {
  getLogo = () => cy.get(locators.idLinkLogo);
  getCardImages = () => cy.get(locators.cssCardImages);
  getCardTitles = () => cy.get(locators.cssCardTitles);
  getCardPrices = () => cy.get(locators.cssCardPrices);
  getCardDescriptions = () => cy.get(locators.cssCardDescriptions);

  clickCardImage(number) {
    this.clickProductImage(number);
  }
  clickCardTitle(number) {
    this.clickProductTitle(number);
  }
  getCardTitleText(number) {
    return this.getProductTitle(number);
  }
  getCardPriceText(number) {
    return this.getProductPrice(number);
  }
  getCardDescriptionText(number) {
    return this.getProductDescription(number);
  }
}

export default CardsPage;
