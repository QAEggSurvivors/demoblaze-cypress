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
            When I click on a product image or title
            And I click on the "Add to cart" button
            Then I should see alert with the message "Product added"
  
    @image @regression
        Scenario: Verify product image
            Given I navigate to the home page
            When I click on a product
            Then I should see the product image
