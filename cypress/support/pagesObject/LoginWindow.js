import cardsPage from './cardsPage';

const LOCATORS = Cypress.env("../locators");

class LoginWindow extends CardsPage {

    getUsernameInput = () => cy.get(LOCATORS.LoginUsernameId);
    getPasswordInput = () => cy.get(LOCATORS.LoginPasswordId);
    getLoginSubmitButton = () => cy.get(LOCATORS.LoginSubmitCss);


    typeUsername(username) {
        this.getUsernameInput().clear().type(username);
    }

    typePassword(password) {
        this.getPasswordInput().clear().type(password);
    }

    clickLoginSubmitButton() {
        this.getLoginSubmitButton().click();
    }

    loginWithCredentials(username, password) {
        this.typeUsername(username);
        this.typePassword(password);
        this.clickLoginSubmitButton();
    }

    validateWelcomeMessageVisible(username) {
        this.getUserName().should("contain.text", `Welcome ${username}`);
    }

    validateLoginButtonVisible() {
        this.getLogin().should("be.visible");
    }

    validateLogoutButtonVisible() {
        this.getLogout().should("be.visible");
    }

    validateLogoutButtonNotVisible() {
        this.getLogout().should("not.exist");
    }

    validateWelcomeMessageNotVisible() {
        this.getUserName().should("not.exist");
    }

}

export default LoginWindow;
