import HomePage from "./HomePage";

const LOCATORS = require('../locators');

class CardsPage extends HomePage { 
  getCardImages = () => cy.get(LOCATORS.cardImagesCss);
  getCardTitles = () => cy.get(LOCATORS.cardTitlesCss);
  getCardPrices = () => cy.get(LOCATORS.cardPricesCss);
  getCardDescriptions = () => cy.get(LOCATORS.cardDescriptionsCss);
  
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
