Feature: Login functionality

    @login @smoke @regression
    Scenario: Successful login with valid credentials
        Given I navigate to the login page
        When I enter valid credentials
        And I click the login button
        Then I should be redirected to the home page
        And I should see my username in the header

    @login @regression
    Scenario: Login fails with invalid credentials
        Given I navigate to the login page
        When I enter invalid credentials
        And I click the login button
        Then I should see an error message

    @login @regression
    Scenario: Login fails with empty fields
        Given I navigate to the login page
        When I click the login button
        Then I should see a required field message