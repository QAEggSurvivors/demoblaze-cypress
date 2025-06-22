import {
    Given,
    When,
    And,
    Then
} from "cypress-cucumber-preprocessor/steps";

import {
    EXPECTED_TITLES_HEADERS,
} from "../../support/utils.js";

const LOCATORS = require("../../support/locators");



Given('I navigate to the {string} page', (page) => {
    cy.HomePage.goMainUrl();
    if (page === 'Product') {
        cy.HomePage.clickProductByTitleRandom();
    } else if (page === 'Cart') {
        cy.HomePage.clickCart();
    } else {
        cy.HomePage.clickHome();
    }
});

When('I click the navbar {string}', (element) => {
    if (element === 'Brand logo') {
        cy.HomePage.clickLogo();
    } else if (element === 'Cart button') {
        cy.HomePage.clickCart();
    } else if (element === 'Contact button') {
        cy.HomePage.clickContact();
    } else if (element === 'Log in button') {
        cy.HomePage.clickLogIn();
    } else if (element === 'Sign up button') {
        cy.HomePage.clickSignUp();
    } else {
        cy.HomePage.clickHome();
    }
});

Then('I should be redirected to the {string} page', (page) => {
    if (page === 'Cart') {
        cy.HomePage.getUrl()
            .should('include', '/cart');
        cy.HomePage.getTitleCartPage()
            .should('be.visible')
            .should('contain', LOCATORS.titleCartPageText)
    } else {
        cy.HomePage.getUrl()
            .should('eq', Cypress.config().baseUrl +"index.html");
        cy.HomePage.getCategoriesTitle()
            .should('be.visible')
            .should('contain', 'CATEGORIES');
    }
});

Then('I should see the {string} modal appears', (element) => {
    cy.HomePage.getModalTitle(element)
        .should('have.text', EXPECTED_TITLES_HEADERS(element));
});