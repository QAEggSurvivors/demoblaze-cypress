Feature: Purchase flow
  As a user
  I want to select products and complete the purchase process
  So that I can successfully buy items from the store

@purchase @regression
Scenario: Add a product to cart and verify Place Order modal opens
  Given I navigate to the home page
  When I click the title of the product "Samsung galaxy s6"
  And I click on Add to cart button
  And I click on header Cart button
  And I click the Place Order button
  Then the order modal should be visible

@purchase @regression
Scenario: Add another product to cart and verify Place Order modal opens
  Given I navigate to the home page
  When I click the title of the product "Iphone 6 32gb"
  And I click on Add to cart button
  And I click on header Cart button
  And I click the Place Order button
  Then the order modal should be visible

@purchase @regression
Scenario: Open and close the Place Order modal
  Given I navigate to the home page
  When I click the title of the product "Nokia lumia 1520"
  And I click on Add to cart button
  And I click on header Cart button
  And I click the Place Order button
  And I click the Close button on the order modal
  Then the order modal should not be visible
