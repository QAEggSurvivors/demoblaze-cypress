import "./commands";
import "@shelex/cypress-allure-plugin";
require("@shelex/cypress-allure-plugin");
require("cypress-xpath");

import CartPage from "./pagesObject/CartPage";
import ContactWindow from "./pagesObject/ContactWindow";
import HomePage from "./pagesObject/HomePage";
import LoginWindow from "./pagesObject/LoginWindow";
import PlaceOrderWindow from "./pagesObject/PlaceOrderWindow";
import ProductPage from "./pagesObject/ProductPage";
import PurchaseWindow from "./pagesObject/PurchaseWindow";
import SignupWindow from "./pagesObject/SignupWindow";

beforeEach(() => {
  cy.CartPage = new CartPage();
  cy.ContactWindow = new ContactWindow();
  cy.HomePage = new HomePage();
  cy.LoginWindow = new LoginWindow();
  cy.PlaceOrderWindow = new PlaceOrderWindow();
  cy.ProductPage = new ProductPage();
  cy.PurchaseWindow = new PurchaseWindow();
  cy.SignupWindow = new SignupWindow();
});

Cypress.on("uncaught:exception", (err, runnable) => {
  if (err.message.includes("Bootstrap's JavaScript requires jQuery")) {
    return false;
  }
});
