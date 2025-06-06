import {
    saveCategoryProducts,
    clickCategoryName
} from "../utils";

import HomePage from "./HomePage";

const LOCATORS = require("../locators");

class CommandsUtilsPage extends HomePage {
    getAlias = (alias) => {
        return cy.get(`@${alias}`)
    };
    getProductDataFromFixtures(productName) {
        const ALL_PRODUCTS = [
            ...Cypress.env('laptops'),
            ...Cypress.env('monitors'),
            ...Cypress.env('phones')
        ];
        const FOUND = ALL_PRODUCTS.find(product => product.name === productName);
        return cy.wrap(FOUND);
    };
    getProductTitleOnCard = () => {
        return cy.get(LOCATORS.cssTitleOncard)
            .invoke('text')
            .then(text => text.trim());
    };
    getProductPriceOnCard = () => {
        return cy.get(LOCATORS.cssPriceOncard)
            .invoke('text')
            .then(text => text.trim());
    };
    getProductDescriptionOnCard = () => {
        return cy.get(LOCATORS.classProductDescriptionOnCard)
            .invoke('text')
            .then(text => text.trim());
    };
    getProductTitleOnProd = () => {
        return cy.get(LOCATORS.classProductTitleOnProd)
            .invoke('text')
            .then(text => text.trim());
    };
    getProductPriceOnProd = () => {
        return cy.get(LOCATORS.classProductPriceOnProd, {
                timeout: 7000
            })
            .invoke('text')
            .then(text => text.trim());
    };
    getProductDescriptionOnProd = () => {
        return cy.get(LOCATORS.cssProductDescriptionOnProd)
            .invoke('text')
            .then(text => text.trim());
    };
    getProductRowByNameOnCart = (name) => {
        return cy.get(LOCATORS.cssProductRowOnCart, {
                timeout: 10000
            })
            .filter((index, el) => el.innerText.includes(name))
            .first();
    };
    getProductPriceFromRowOnCart = ($row) => {
        return cy.wrap($row).find(LOCATORS.cssProductPriceOnCart) 
            .should("exist")
            .invoke('text')
            .then(text => text.trim());
    };
    getProductNames = (name) => {
        return Cypress.env(name) || [];
    };

    clickCategoryName = (categoryName) => {
        return clickCategoryName(categoryName);
    };
    clickCategoryByNameOrRandom = (categoryName) => {
        return cy.clickRandomCategory(categoryName);
    };
    clickProductByImageRandom = () => {
        return cy.clickProductByImageRandom();
    };
    clickProductByTitleRandom = (productName) => {
        return cy.clickProductByTitleRandom(productName);
    };
    clickProductByTitleWithNextButton = (productName) => {
        return cy.clickProductByTitleWithNextButton(productName);
    };
    clickMultipleProductsByNameWithNextButton = (min, max) => {
        return cy.clickMultipleProductsByNameWithNextButton(min, max);
    };

    putAlias = (name, alias) => {
        return cy.wrap(name).as(alias);
    };

    saveProductsByCategory = (categoryName) => {
        return cy.wrap(categoryName).then((catName) => {
            return saveCategoryProducts(catName);
        });
    };

    readJsonFile = (filePath) => {
        return cy.readFile(filePath)
    };
}
export default CommandsUtilsPage;