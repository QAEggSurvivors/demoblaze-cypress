Feature: Sign up
    @sign_up
    Scenario: Open sign up modal
        Given I navigate to the home page
        When I click the sign up button on the header
        Then I should see the sign up modal appears

    @sign_up
    Scenario: Close sign up modal
        Given I navigate to the home page
        When I click the sign up button on the header
        And I click the modal close button
        Then I should see the sign up modal disappears

    @sign_up
    Scenario: Create new user
        Given I navigate to the home page
        When I click the sign up button on the header
        And I type the username "testUser1" and password "123456"
        And I click the Sign up button
        Then I should see a alert with the message "Sign up successful."

    @sign_up
    Scenario: Fail creating existing user
        Given I navigate to the home page
        When I click the sign up button on the header
        And I type the username "testUser1" and password "123456"
        And I click the Sign up button
        Then I should see a alert with the message "This user already exist."