Feature: Product Page

As a user, I want to interact with the products on the website
    
    @details @smoke
        Scenario: View product details
            Given I navigate to the home page
            When I click on a product
            Then I should see the product details page

    @add @regression
        Scenario: Add product to the cart
            Given I navigate to the home page
            When I click on a product
            And I add the product to the cart
            Then I should see the product in the cart

    @image @regression
        Scenario: Verify product image
            Given I navigate to the home page
            When I click on a product
            Then I should see the product image