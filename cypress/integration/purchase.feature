Feature: Purchase flow
  As a user
  I want to select products and complete the purchase process
  So that I can successfully buy items from the store

@purchase @regression
Scenario: Add a product to cart and go to cart page
  Given I am on the home page
  When I select the product "Samsung galaxy s6"
  And I add the product to the cart
  And I go to the cart page
  Then I should see the product "Samsung galaxy s6" in my cart

@purchase @regression
Scenario: Add a product to cart and go to cart page
  Given I am on the home page
  When I select the product "Iphone 6 32gb"
  And I add the product to the cart
  And I go to the cart page
  Then I should see the product "Iphone 6 32gb" in my cart

@purchase @regression
Scenario: Open the Place Order modal from the cart
  Given I have products in my cart and I am on the cart page
  When I click the Place Order button
  Then the order modal should be visible
