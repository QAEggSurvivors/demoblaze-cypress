import {
  Given,
  When,
  And,
  Then
} from "cypress-cucumber-preprocessor/steps";

Given('The cart contains at least {string} products {string} duplicates {string}', (quantity, article, title) => {
  cy.CartPage.fillCartWithRandomProducts(quantity, article, title);
});

When('I click on the cart header button', () => {
  cy.CartPage.clickCart();
});

Then('I should {string} the product in the cart', (question) => {
  let selectedProducts;
  if (question === 'see') {
    selectedProducts = Cypress.env("selectedProductName") || [];
  } else {
    selectedProducts = Cypress.env("productNameAfterDelete") || [];
  }
  const EXPECTED_TITLES = selectedProducts.map(p => String(p).trim());
  cy.CartPage.getListProductsInCart().then((products) => {
    const CART_TITLES = products.map(p => String(p.title).trim());
    expect([...CART_TITLES].sort()).to.deep.equal([...EXPECTED_TITLES].sort());
  });
});

And('I click on the {string} button for the product {string} in the cart', (buttonText, titleProduct) => {
  cy.CartPage.clickDeleteFromCart(titleProduct);
});

Then('I should see the correct total price in the cart', () => {
  cy.then(() => {
    const EXPECTED_TOTAL = cy.CartPage.getTotalPriceOfSelected(); 
    cy.CartPage.getCartTotalPrice().then((actualTotal) => {
      expect(actualTotal).to.equal(EXPECTED_TOTAL);
    });
  });
});
