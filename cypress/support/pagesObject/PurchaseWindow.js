import ProductPage from './ProductPage'; 

const LOCATORS = Cypress.env("../locators");

class PurchaseWindow extends ProductPage { 
  getPlaceOrderButton = () => cy.get(LOCATORS.cssPlaceOrderButtonOnCart);
  getConfirmButton = () => cy.get(LOCATORS.classConfirmButton);

  goToCart() {
    this.clickCart();
  }

  clickPlaceOrderButton() {
    this.getPlaceOrderButton().click();
  }

  clickConfirmButton() {
    this.getConfirmButton().click({ force: true }); 
  }
}

export default PurchaseWindow;