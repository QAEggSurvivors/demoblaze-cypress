import HomePage from "./HomePage";

const LOCATORS = require("../locators");

class LoginWindow extends HomePage {

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

    getWelcomeMessageText() {
        return this.getUserName().invoke("text");
    }

    isLogoutButtonVisible() {
        return this.getLogout();
    }

    isLoginButtonVisible() {
        return this.getLogin();
    }

    isWelcomeMessageVisible() {
        return this.getUserName(); 
    }
}

export default LoginWindow;