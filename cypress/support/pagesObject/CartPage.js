import HomePage from "./HomePage";

const LOCATORS = require('./HomePage')

class CartPage extends HomePage {
  getCartRows = () => cy.get(LOCATORS.productRowOnCartCss);
  getCartProductTitle = ($row) => cy.wrap($row).find(LOCATORS.productTitleOnCartCss).then(text => text.trim());
  getCartProductPrice = ($row) => cy.wrap($row).find(LOCATORS.productPriceOnCartCss).then(text => text.trim());
  getCartTotalPrice = () => cy.get(LOCATORS.totalPriceId).invoke('text').then(text => text.trim());
  getDeleteButton = ($row) => cy.wrap($row).find(LOCATORS.deleteButtonClass);
  
  clickPlaceOrderButton = () =>{
    cy.get(LOCATORS.placeOrderButtonCss).click();
  }
  
  verifyProductInCart = (productName) => {
    return this.getCartRows().filter((index, row) => {
      return Cypress.$(row).text().includes(productName)
    }).should('have.lenght.gt', 0);
  }
  
  removeProductFromCart = (productName) => {
    this.getCartRows().filter((index, row) => {
      return Cypress.$(row).text().includes(productName);
    }).first().then(($row) => {
      this.clickDeleteButton($row);
    });
  };
  
  verifyCartTotalPrice = (expectedTotal) => {
    this.getCartTotalPrice().should('equal', expectedTotal.toString());
  };
}

export default CartPage;