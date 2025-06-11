import HomePage from './HomePage'; 

const locators = Cypress.env("../locators");

class PurchaseWindow extends HomePage { 
  getProductByName = (productName) => cy.get(locators.productTitlesClass).contains(productName);
  getAddToCartButton = () => cy.get(locators.classAddToCartButton);
  getCartLink = () => cy.get(locators.linkCartId);
  getPlaceOrderButtonOnCart = () => cy.get(locators.cssPlaceOrderButtonOnCart);
  getConfirmButton = () => cy.get(locators.classConfirmButton);

  selectProductByName(productName) {
    this.getProductByName(productName).click();
  }
  addToCart() {
    this.getAddToCartButton().click();
  }
  goToCart() {
    this.getCartLink().click();
  }
  clickPlaceOrderButtonOnCart() {
    this.getPlaceOrderButtonOnCart().click();
  }
  clickConfirmButton() {
    this.getConfirmButton().click({ force: true }); 
  }
}

export default PurchaseWindow;