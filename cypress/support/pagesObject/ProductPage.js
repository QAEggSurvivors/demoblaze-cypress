import HomePage from './HomePage';

const LOCATORS = require('../locators');

class ProductPage extends HomePage {

  getProductTitle = () => cy.get(LOCATORS.productTitleClass);
  getProductPrice = () => cy.get(LOCATORS.productPriceOnProdClass);

  getProductDescription = () => cy.get(LOCATORS.productDescriptionOnProdCss);
  getProductImage = () => cy.get(LOCATORS.productImagesCss);
  getAddToCartButton = () => cy.get(LOCATORS.addToCartButtonClass);
  
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
