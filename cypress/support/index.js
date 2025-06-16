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
import CommandsUtilsPage from "./pagesObject/CommandsUtilsPage";

beforeEach(() => {
  cy.CartPage = new CartPage();
  cy.ContactWindow = new ContactWindow();
  cy.HomePage = new HomePage();
  cy.LoginWindow = new LoginWindow();
  cy.PlaceOrderWindow = new PlaceOrderWindow();
  cy.ProductPage = new ProductPage();
  cy.PurchaseWindow = new PurchaseWindow();
  cy.SignupWindow = new SignupWindow();
  cy.CommandsUtilsPage = new CommandsUtilsPage();
  cy.fixture("laptops").then(data => Cypress.env("laptops", data));
  cy.fixture("monitors").then(data => Cypress.env("monitors", data));
  cy.fixture("phones").then(data => Cypress.env("phones", data));
});

Cypress.on("uncaught:exception", (err, runnable) => {
  if (err.message.includes("Bootstrap's JavaScript requires jQuery")) {
    return false;
  }
});

Cypress.on("uncaught:exception", (err) => {
  if (err.message.includes("hls.demoblaze.com")) {
    return false;
  }
});
