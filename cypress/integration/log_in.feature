Feature: Login and Logout functionality

    As a registered user
    I want to be able to log in and log out
    So that I can access and exit my account securely

    Background:
    Given I navigate to the Demoblaze home page

    @login @smoke @regression
    Scenario: Successful login with valid credentials
        When I click on the "Log in" button in the header
        And I wait for the login modal to appear
        And I type "testuser" in the "Username" input field
        And I type "Password123" in the "Password" input field
        And I click on the "Log in" button in the modal
        Then I should see the welcome message "Welcome testuser" in the header
        And the "Log out" button should be visible in the header

    @login @regression
    Scenario: Login fails with invalid credentials
        When I click on the "Log in" button in the header
        And I wait for the login modal to appear
        And I type "wronguser" in the "Username" input field
        And I type "WrongPass123" in the "Password" input field
        And I click on the "Log in" button in the modal
        Then I should see an error message for incorrect login credentials

    @login @regression
    Scenario: Attempting login with empty username
        When I click on the "Log in" button in the header
        And I wait for the login modal to appear
        And I leave the "Username" input field empty
        And I type "Password123" in the "Password" input field
        And I click on the "Log in" button in the modal
        Then I should see an alert with the message "Please fill out Username and Password"

    @login @regression
    Scenario: Attempting login with empty password
        When I click on the "Log in" button in the header
        And I wait for the login modal to appear
        And I type "testuser" in the "Username" input field
        And I leave the "Password" input field empty
        And I click on the "Log in" button in the modal
        Then I should see a login error message indicating empty fields

    @logout @smoke @regression
    Scenario: Successful logout after login
        Given I am logged in with username "testuser" and password "Password123"
        When I click on the "Log out" button in the header
        Then I should see the "Log in" button in the header
        And the welcome message should not be visible

    @logout @regression
    Scenario: Logout button not visible when not logged in
        Then I should not see the "Log out" button in the header

