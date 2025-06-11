Feature: Login and Logout functionality

    As a registered user
    I want to be able to log in and log out
    So that I can securely access and exit my user session

    @login @smoke @regression
    Scenario: Successful login with valid credentials
        Given I navigate to the home page
        And I open the login modal
        When I enter valid credentials
        And I click the login button
        Then I should be redirected to the home page
        And I should see my username in the header

    @login @regression
    Scenario: Login fails with invalid credentials
        Given I navigate to the home page
        And I open the login modal
        When I enter invalid credentials
        And I click the login button
        Then I should see an error message

    @login @regression
    Scenario: Login fails with empty fields
        Given I navigate to the home page
        And I open the login modal
        When I click the login button
        Then I should see a required field message

    @logout @smoke @ regression
    Scenario: Logout after successful login
        Given I am logged in with valid credentials
        When I click the logout button
        Then I should be logged out
        And I should be redirected to the home page
        And I should see the login button in the header

    @logout @ regression
    Scenario: Logout option is hidden when not loged in
        Given I navigate to the home page
        Then I should not see the logout button in the header

    @logout @ regression
    Scenario: User cannot access protected areas after logout
        Given I am logged in with valid credentials
        And I navigate to the cart page
        When I click the logout button
        And I refresh the page
        Then I should be redirected to the home page
        And I should not see my username in the header
        And I should see the login button in the header