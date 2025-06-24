import {Given, When, Then} from "cypress-cucumber-preprocessor/steps";
import CardsPage from '../../support/pagesObject/cardsPage';

const cardsPage = new CardsPage();

const productPosition = {
    'first': 0,
    'second': 1,
    'third': 2
};

// Go to product page
Given('I navigate to the home page', () => {
    cardsPage.goMainUrl(); 
});

When('I click the {string} product {string}', (product, link) => {
    const index = productPosition[product];
    if (link === 'name') {
        cardsPage.clickCardTitle(index);
    } else if (link === 'image') {
        cardsPage.clickCardImage(index);
    }
});

Then('I should be redirected to url {string}', (expectedUrl) => {
  cy.get('.btn-success').should('be.visible');
  cy.url().then((actualUrl) => {
      const actualPath = new URL(actualUrl).pathname + new URL(actualUrl).search;
      const expectedPath = new URL(expectedUrl).pathname + new URL(expectedUrl).search;
      expect(actualPath).to.equal(expectedPath);
  });
});

// Validate product information
let productToValidate;

When('I see the {string}', (product) => {
    productToValidate = product;
    cy.log(`Validating info for: ${productToValidate}`);
});

Then('I should see that the {string} is {string}', (section, info) => {
    const index = productPosition[productToValidate];
    switch (section) {
        case 'name':
            cardsPage.getCardTitleText(index).then((actualText) => {
                expect(actualText).to.equal(info);
            });
            break;
        case 'price':
            cardsPage.getCardPriceText(index).then((actualText) => {
                expect(actualText).to.include(info);
            });
            break;
        case 'description':
            cardsPage.getCardDescriptionText(index).then((actualText) => {
                const cleanedActualText = actualText.replace(/\s+/g, ' ').trim();
                const cleanedInfo = info.replace(/\s+/g, ' ').trim();
                expect(cleanedActualText).to.equal(cleanedInfo);
            });
            break;
    }
});