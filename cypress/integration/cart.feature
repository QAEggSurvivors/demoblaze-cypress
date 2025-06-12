@cart @smoke
Feature: Shopping Cart

  As a user, I want to manage products in the shopping cart

  @add @smoke
  Scenario: Verify product is in the cart
    Given I navigate to the home page
    When I click on a product image or title
        And I click on the "Add to cart" button
        And I click on the cart header button
    Then I should see the product in the cart

  @remove @regression
  Scenario: Remove product from the cart
    Given I navigate to the home page
        And I click on a product image or title
        And I click on the "Add to cart" button
        And I click on the cart header button
    When I click on the "Remove" button for the product in the cart
    Then I should not see the product in the cart

  @total @regression
  Scenario: Verify total price in the cart
    Given I navigate to the home page
        And I click on the first product image or title
        And I click on the "Add to cart" button
        And I navigate back to the home page
        And I click on the second product image or title
        And I click on the "Add to cart" button
    When I click on the cart header button
    Then I should see the correct total price in the cart
