import HomePage from "./HomePage";

const LOCATORS = require("../locators");

class SignupWindow extends HomePage {
  getUsernameInput = () => cy.get(LOCATORS.signUserNameInputId);
  getPasswordInput = () => cy.get(LOCATORS.signPasswordInputId);
  getSignUpButton = () => cy.get(LOCATORS.signUpButtonCss);
  getCloseButton = () => cy.get(LOCATORS.closeButtonCss);

  typeUsername(username) {
    this.getUsernameInput().type(username);
  }
  typePassword(password) {
    this.getPasswordInput().type(password);
  }
  clickSignUpButton() {
    this.getSignUpButton().click();
  }
  clickCloseButton() {
    this.getCloseButton().click();
  }
  fillLoginForm(username, password) {
    const alertMessage = cy.getAlertMessage()
    this.typeUsername(username);
    this.typePassword(password);
    this.clickLoginSubmitButton();
    return alertMessage
  }
}

export default SignupWindow;
