import HomePage from './HomePage';

const locators = require('../support/locators.js');

class ProductPage extends HomePage {

  getProductTitle = () => cy.get(locators.classProductTitle);
  getProductPrice = () => cy.get(locators.classProductPrice);

  getProductDescription = () => cy.get(locators.idProductDescription);
  getProductImage = () => cy.get(locators.classProductImage);
  getAddToCartButton = () => cy.get(locators.classAddToCartButton);
  
  clickAddToCart(){
    this.getAddToCartButton().click();
  }
  getProductTitleText() {
    return this.getProductTitle().invoke("text");
  }
  getProductPriceText() {
    return this.getProductPrice().invoke("text");
  }
  getProductDescriptionText() {

    return this.getProductDescription().invoke("text");
  }
}

export default ProductPage;
