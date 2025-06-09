Feature: Place Order
  As a user
  I want to successfully place an order for products in my cart
  So that I can complete my purchase.

@place-order @regression
Scenario: Attempt to place an order with an empty form
  Given I have products in my cart and I am on the cart page
  When I proceed to place the order
  And I click the Purchase button without filling the form
  Then I should receive an alert "Please fill out Name and Creditcard."

@place-order @regression
Scenario: Attempt to place an order with only Name filled in the form
  Given I have products in my cart and I am on the cart page
  When I proceed to place the order
  And I fill in the "Name" field with "Test User"
  And I click the Purchase button without filling the rest of the form
  Then I should receive an alert "Please fill out Name and Creditcard."

@place-order
Scenario: Close the Place Order modal
  Given I have products in my cart and I am on the cart page
  When I proceed to place the order
  And I click the Close button on the order modal
  Then the order modal should not be visible