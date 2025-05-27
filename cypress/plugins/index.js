/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 */
const allureWriter = require("@shelex/cypress-allure-plugin/writer");
const cucumber = require("cypress-cucumber-preprocessor").default;

module.exports = (on, config) => {
  allureWriter(on, config);
  on("file:preprocessor", cucumber());
  return config;
};
