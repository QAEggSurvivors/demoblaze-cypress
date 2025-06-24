import {Given, When, Then} from "cypress-cucumber-preprocessor/steps";
import ContactWindow from '../../support/pagesObject/ContactWindow';

const contactWindow = new ContactWindow();
// Handles transition errors from Bootstrap on the Contact modal
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('Modal is transitioning')) return false;
});

// Background
Given('I navigate to the Demoblaze home page', () => {
  contactWindow.goMainUrl();
});

// Open and close the contact modal
When('I click on the {string} button in the header', (button) => {
  if (button === 'Contact') {
    contactWindow.clickContact();
  }
});

When('I wait for the contact modal to appear', () => {
  cy.wait(1000); // Due to delay in the element visibility
  cy.get('#exampleModal').should('have.class', 'show');
  contactWindow.getContactEmailInput().should('be.visible');
});

When('I click on the "Close" button in the contact modal', () => {
  contactWindow.clickCloseButton();
});

Then('I should not see the contact modal', () => {
  cy.wait(1000); 
  // Due to delay in how to web hides the element post closing the modal
  cy.get('#exampleModal').should('not.have.class', 'show');
});


// Submit the contact form with valid data
When('I type {string} in the {string} field', (text, field) => {
  switch (field) {
    case 'Contact Email':
      contactWindow.typeContactEmail(text);
      break;
    case 'Contact Name':
      contactWindow.typeContactName(text);
      break;
    case 'Message':
      contactWindow.typeContactMessage(text);
      break;
  }
});

// Submit the contact form with empty fields
When('I leave the {string} field empty', (field) => {
  switch (field) {
    case 'Contact Email':
      contactWindow.getContactEmailInput().clear();
      break;
    case 'Contact Name':
      contactWindow.getContactNameInput().clear();
      break;
    case 'Message':
      contactWindow.getContactMessageInput().clear();
      break;
  }
});

When('I click on the {string} button in the contact modal', (button) => {
  if (button === 'Send') {
    contactWindow.clickSendButton();
  }
});

Then('I should see an alert with the message {string}', (expectedAlertText) => {
  cy.on('window:alert', (actualText) => {
    expect(actualText).to.equal(expectedAlertText);
  });
});