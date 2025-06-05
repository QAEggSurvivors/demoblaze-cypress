import HomePage from './HomePage';

const locators = Cypress.env("locators");

class LoginWindow extends HomePage {
    getUsernameInput = () => cy.get(locators.idLoginUsername);
    getPasswordInput = () => cy.get(locators.idLoginPassword);
    getLoginSubmitButton = () => cy.get(locators.idLoginSubmit);

    typeUsername(username) {
        this.getUsernameInput().type(username);
    }
    typePassword(password) {
        this.getPasswordInput().type(password);
    }

    clickLoginSubmitButton() {
        this.getLoginSubmitButton().click();
    }

    fillLoginForm(username, password) {
        this.typeUsername(username);
        this.typePassword(password);
        this.clickLoginSubmitButton();
    }

}

export default LoginWindow;