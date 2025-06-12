import HomePage from "./HomePage";

const LOCATORS = require("../locators");

class ContactWindow extends HomePage {

    getContactEmailInput = () => cy.get(LOCATORS.ContactEmailId);
    getContactNameInput = () => cy.get(LOCATORS.ContactNameId);
    getContactMessageInput = () => cy.get(LOCATORS.MessageTextId);
    getSendButton = () => cy.get(LOCATORS.ContactSendButtonCss);
    getCloseButton = () => cy.get(LOCATORS.ContactCloseButtonCss);

    typeContactEmail(email) {
        this.getContactEmailInput().clear().type(email);
    }

    typeContactName(name) {
        this.getContactNameInput().clear().type(name);
    }

    typeContactMessage(message) {
        this.getContactMessageInput().clear().type(message);
    }

    clickSendButton() {
        this.getSendButton().click();
    }

    clickCloseButton() {
        this.getCloseButton().click();
    }

    fillContactForm(email, name, message) {
        this.typeContactEmail(email);
        this.typeContactName(name);
        this.typeContactMessage(message);
    }

    submitContactForm(email, name, message) {
        this.fillContactForm(email, name, message);
        this.clickSendButton();
    }

}

export default ContactWindow;