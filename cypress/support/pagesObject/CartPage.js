import HomePage from "./HomePage";

const LOCATORS = require('../locators')

class CartPage extends HomePage {
  getCartRows = () => cy.get(LOCATORS.productRowOnCartCss);
  getCartProductTitle = ($row) => cy.wrap($row).find(LOCATORS.productTitleOnCartCss).then(text => text.trim());
  getCartProductPrice = ($row) => cy.wrap($row).find(LOCATORS.productPriceOnCartCss).then(text => text.trim());
  getCartTotalPrice() {
    return cy.get("tbody#tbodyid tr:visible", {
        timeout: 20000
      })
      .should("have.length", Cypress.env("selectedProductName").length)
      .then(() => {
        return cy.get(LOCATORS.totalPriceId)
          .should('not.be.empty')
          .invoke('text')
          .then(text => {
            return Number(text.trim()) || 0;
          });
      });
  }
  getDeleteButton = ($row) => cy.wrap($row).find(LOCATORS.deleteButtonClass);

  clickPlaceOrderButton = () => {
    cy.get(LOCATORS.placeOrderButtonCss).click();
  }

  verifyProductInCart = (productName) => {
    return this.getCartRows().filter((index, row) => {
      return Cypress.$(row).text().includes(productName)
    }).should('have.length.gt', 0);
  }

  removeProductFromCart = (productName) => {
    this.getCartRows().filter((index, row) => {
      return Cypress.$(row).text().includes(productName);
    }).first().then(($row) => {
      this.clickDeleteButton($row);
    });
  }

  verifyCartTotalPrice = (expectedTotal) => {
    return this.getCartTotalPrice().should('equal', expectedTotal.toString());
  }
  getSelectedProductsWithPrices() {
    const SELECTED_NAMES = Cypress.env("selectedProductName") || [];

    return SELECTED_NAMES.map(name => this.getProductDataFromFixtures(name))
      .map(product => ({
        name: product.name,
        price: Number(String(product.price).replace(/\$/g, ''))
      }));
  }
  getTotalPriceOfSelected() {
    const PRODUCTS = this.getSelectedProductsWithPrices();
    return PRODUCTS.reduce((total, product) => {
      return total + (Number(product.price) || 0);
    }, 0);
  }
  clickDeleteFromCart(titleProduct) {
    return cy.clickDeleteFromCart("oneName", titleProduct)
  }
  getListProductsInCart() {
    return cy.getListProductsInCart();
  }

}

export default CartPage;