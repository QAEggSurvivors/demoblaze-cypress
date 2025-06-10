import HomePage from "./HomePage.js";

class CardsPage extends HomePage {
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
