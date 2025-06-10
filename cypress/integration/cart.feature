@cart @smoke
Feature: Shopping Cart

  As a user, I want to manage products in the shopping cart

  @add @smoke
  Scenario: Verify product is in the cart
    Given I navigate to the home page
    And I add a product to the cart
    Then I should see the product in the cart

  @remove @regression
  Scenario: Remove product from the cart
    Given I navigate to the home page
    And I add a product to the cart
    When I remove the product from the cart
    Then I should not see the product in the cart

  @total @regression
  Scenario: Verify total price in the cart
    Given I navigate to the home page
    And I add multiple products to the cart
    Then I should see the correct total price in the cart
