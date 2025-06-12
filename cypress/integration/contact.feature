Feature: Contact form functionality

    As a visitor
    I want to send a message using the contact form
    So that I can get in touch with the website team

    Background:
    Given I navigate to the Demoblaze home page

    @contact @smoke @regression
    Scenario: Open and close the contact modal
        When I click on the "Contact" button in the header
        And I wait for the contact modal to appear
        And I click on the "Close" button in the contact modal
        Then I should not see the contact modal

    @contact @regression
    Scenario: Submit the contact form with valid data
        When I click on the "Contact" button in the header
        And I wait for the contact modal to appear
        And I type "user@email.com" in the "Contact Email" field
        And I type "User" in the "Contact Name" field
        And I type "Hello, this is a test" in the "Message" field
        And I click on the "Send" button in the contact modal
        Then I should see an alert with the message "Thanks for the message!!"

    @contact @regression
    Scenario: Submit the contact form with all fields empty
        When I click on the "Contact" button in the header
        And I wait for the contact modal to appear
        And I leave the "Contact Email" field empty
        And I leave the "Contact Name" field empty
        And I leave the "Message" field empty
        And I click on the "Send" button in the contact modal
        Then I should see an alert with the message "Please fill out all fields"

    @contact @regression
    Scenario: Submit the contact form with missing email
        When I click on the "Contact" button in the header
        And I wait for the contact modal to appear
        And I leave the "Contact Email" field empty
        And I type "User2" in the "Contact Name" field
        And I type "Message without mail" in the "Message" field
        And I click on the "Send" button in the contact modal
        Then I should see an alert with the message "Please fill out all fields"

    @contact @regression
    Scenario: Submit the contact form with missing message
        When I click on the "Contact" button in the header
        And I wait for the contact modal to appear
        And I type "user3@email.com" in the "Contact Email" field
        And I type "User3" in the "Contact Name" field
        And I leave the "Message" field empty
        And I click on the "Send" button in the contact modal
        Then I should see an alert with the message "Please fill out all fields"