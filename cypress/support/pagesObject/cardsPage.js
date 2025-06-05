import HomePage from "./HomePage";

const locators = Cypress.env("locators");

class CardsPage extends HomePage { 
  getLogo = () => cy.get(locators.idLinkLogo);
  getCardImages = () => cy.get(locators.cssCardImages);
  getCardTitles = () => cy.get(locators.cssCardTitles);
  getCardPrices = () => cy.get(locators.cssCardPrices);
  getCardDescriptions = () => cy.get(locators.cssCardDescriptions);
  
  clickCardImage(number) {
    this.getCardImages().eq(number).click();
  }
  clickCardTitle(number) {
    this.getCardTitles().eq(number).click();
  }
  
  getCardTitleText(number) { 
    return this.getCardTitles().eq(number).invoke("text");
  }
  getCardPriceText(number) {
    return this.getCardPrices().eq(number).invoke("text");
  }
  getCardDescriptionText(number) {
    return this.getCardDescriptions().eq(number).invoke("text");
  }
}

export default CardsPage;
