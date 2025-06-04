import HomePage from './HomePage'; 

const locators = Cypress.env("locators");

class LoginWindow extends HomePage { 
    getUsernameInput = () => cy.get(locators.idLoginUsername);
    getPasswordInput = () => cy.get(locators.idLoginPassword);
    getLoginSubmitButton = () => cy.get(locators.idLoginSubmit);
}

export default LoginWindow;