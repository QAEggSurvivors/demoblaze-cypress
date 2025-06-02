import HomePage from './HomePage'; 

const locators = Cypress.env("locators");

class PageOrderWindow extends HomePage { 

  getOrderModal = () => cy.get(locators.idOrderModal);
  getOrderModalLabel = () => cy.get(locators.idOrderModalLabel);
  getNameInput = () => cy.get(locators.idNameInput);
  getCountryInput = () => cy.get(locators.idCountryInput);
  getCityInput = () => cy.get(locators.idCityInput);
  getCardInput = () => cy.get(locators.idCardInput);
  getMonthInput = () => cy.get(locators.idMonthInput);
  getYearInput = () => cy.get(locators.idYearInput);
  getPurchaseButton = () => cy.get(locators.cssPurchaseButton);
  getCloseOrderModalButton = () => cy.get(locators.cssCloseOrderModalButton);
  getSweetAlert = () => cy.get(locators.classSweetAlert);
  getSweetAlertTitle = () => cy.get(locators.classSweetAlertTitle);
  getConfirmButton = () => cy.get(locators.classConfirmButton);


  typeName(name) {
    this.getNameInput().type(name);
  }
  typeCountry(country) {
    this.getCountryInput().type(country);
  }
  typeCity(city) {
    this.getCityInput().type(city);
  }
  typeCard(cardNumber) {
    this.getCardInput().type(cardNumber);
  }
  typeMonth(month) {
    this.getMonthInput().type(month);
  }
  typeYear(year) {
    this.getYearInput().type(year);
  }
  clickPurchaseButton() {
    this.getPurchaseButton().click();
  }
  clickCloseOrderModalButton() {
    this.getCloseOrderModalButton().click();
  }
  clickConfirmButton() {
    this.getConfirmButton().click({ force: true }); 
  }
  fillOrderForm(name, country, city, card, month, year) {
    this.typeName(name);
    this.typeCountry(country);
    this.typeCity(city);
    this.typeCard(card);
    this.typeMonth(month);
    this.typeYear(year);
  }
  verifyOrderModalIsVisible() {
    this.getOrderModal().should("be.visible");
    this.getOrderModalLabel().should("contain.text", "Place order");
  }
  verifyPurchaseSuccessMessage(expectedMessage = "Thank you for your purchase!") {
    this.getSweetAlertTitle().should("have.text", expectedMessage);
  }
  verifySweetAlertIsVisible() {
    this.getSweetAlert().should("be.visible");
  }
}

export default PageOrderWindow;