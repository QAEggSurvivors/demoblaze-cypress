import {
  Given,
  When,
  And,
  Then
} from "cypress-cucumber-preprocessor/steps";

const CATEGORY = 'selectedCategory';
const SELECTED_PRODUCT = 'selectedProductName';
Given('I open the {string} website', () => {
  cy.CommandsUtilsPage.goMainUrl();
});

When("I select {string} category", (categoryName) => {
  cy.CommandsUtilsPage.clickCategoryByNameOrRandom(categoryName);
});

Then("A JSON file should be generated with {string} products in it", (length) => {
  cy.CommandsUtilsPage.getAlias(CATEGORY).should('exist').then((categoryName) => {
    cy.CommandsUtilsPage.saveProductsByCategory(categoryName).then(({
      filePath,
      products
    }) => {
      expect(products).to.have.length(Number(length));

      cy.CommandsUtilsPage.readJsonFile(filePath)
        .should('exist')
        .its('length')
        .should('eq', Number(length));
    });
  });
});

And('I click on the image of the card of a random product.', () => {
  cy.CommandsUtilsPage.clickProductByImageRandom();
});

Then('I should be taken to the product page', () => {
  cy.CommandsUtilsPage.getAlias(SELECTED_PRODUCT).then(expectedName => {
    cy.CommandsUtilsPage.getProductDataFromFixtures(expectedName).then(PRODUCT_DATA => {
      cy.CommandsUtilsPage.getProductTitleOnProd().should('eq', expectedName);
      cy.CommandsUtilsPage.getProductPriceOnProd().should('contain', PRODUCT_DATA.price);
      cy.CommandsUtilsPage.getProductDescriptionOnProd().should('eq', PRODUCT_DATA.description);
    });
  });
});

And('I click on the image of the card of a random product', () => {
  cy.CommandsUtilsPage.clickProductByImageRandom();
});

And('I click a random product by title', () => {
  cy.CommandsUtilsPage.clickProductByTitleRandom();
});

And('I search and click on {string}', (productName) => {
  cy.CommandsUtilsPage.clickProductByTitleWithNextButton(productName);
});

When('I add between {string} and {string} products randomly to the cart', (min, max) => {
  const MIN = parseInt(min, 10);
  const MAX = parseInt(max, 10);
  cy.CommandsUtilsPage.clickMultipleProductsByNameWithNextButton(MIN, MAX);
});

And('I click on the cart button', () => {
  cy.CommandsUtilsPage.clickCart();
});

Then('I should see the products in the car', () => {
  cy.log('Productos seleccionados:', cy.CommandsUtilsPage.getProductNames(SELECTED_PRODUCT));
  cy.wrap(cy.CommandsUtilsPage.getProductNames(SELECTED_PRODUCT)).each((productName) => {  // Cambio clave aquí
    cy.CommandsUtilsPage.getProductDataFromFixtures(productName).then((PRODUCT_DATA) => {
      cy.CommandsUtilsPage.getProductRowByNameOnCart(productName).then(($row) => {
        cy.CommandsUtilsPage.getProductPriceFromRowOnCart($row)
          .should('eq', PRODUCT_DATA.price.replace('$', '').trim());
      });
    });
  });
});