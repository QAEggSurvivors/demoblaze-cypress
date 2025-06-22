@cart @smoke
Feature: Shopping Cart

  As a user, I want to manage products in the shopping cart

  @add @smoke
  Scenario Outline: Verify at least "<number>" products is in the cart, "<article>" duplicates. Witness product "<title>"
    When The cart contains at least "<number>" products "<article>" duplicates "<title>"
    And I click on the cart header button
    Then I should "see" the product in the cart
    Examples:
      | number | article | title            |
      | 1      | without | none             |
      | 2      | and     | Apple monitor 24 |
      | 2      | without | Apple monitor 24 |

  @remove @regression
  Scenario Outline: Remove one product from the cart, "<article>" duplicates. Witness product "<title>"
    Given The cart contains at least "<number>" products "<article>" duplicates "<title>"
    When I click on the cart header button
    And I click on the "Remove" button for the product "<title>" in the cart
    Then I should "not see" the product in the cart
    Examples:
      | number | article | title               |
      | 1      | without | Iphone 6 32gb       |
      | 3      | without | 2017 Dell 15.6 Inch |

  @total @regression
  Scenario Outline: Verify total price in the cart at least "<number>" products, "<article>" duplicates. Witness product "<title>"
    Given The cart contains at least "<number>" products "<article>" duplicates "<title>"
    When I click on the cart header button
    Then I should see the correct total price in the cart
    Examples:
      | number | article | title            |
      | 2      | without | Sony vaio i5     |
      | 10     | without | Nokia lumia 1520 |
      | 3      | and     | Nokia lumia 1520 |



  Scenario Outline: As a user, I want to verify that the “Place Order” button works, in the cart at least "<number>" products, "<article>" duplicates. Witness product "<title>"
    Given The cart contains at least "<number>" products "<article>" duplicates "<title>"
    When I click on the cart header button
    And I click on the "Place order" button
    Then I should see the "Place order" modal window
    Examples:
      | number | article | title       |
      | random | without | none        |
      | random | without | MacBook Pro |
      | random | and     | HTC One M9  |
