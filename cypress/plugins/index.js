/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 */
const fs = require('fs');
const path = require('path');
const allureWriter = require("@shelex/cypress-allure-plugin/writer");
const cucumber = require("cypress-cucumber-preprocessor").default;

module.exports = (on, config) => {
  on('task', {
    deleteFileIfExists(filePath) {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        return `Archivo ${filePath} eliminado`;
      }
      return `Archivo ${filePath} no existía`;
    }
  });
  allureWriter(on, config);
  on("file:preprocessor", cucumber());
  return config;
};
