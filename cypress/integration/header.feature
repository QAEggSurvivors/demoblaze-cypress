Feature: Header
    # Brand logo
    @header
    Scenario Outline: Navigate to home with brand logo from "<page>" page
        Given I navigate to the "<page>" page
        When I click the navbar "Brand logo"
        Then I should be redirected to the "Home" page
    Examples:
            | page    |
            | Product |
            | Cart    |

    # Home button
    @header
    Scenario Outline: Navigate to Home with Home button from "<page>" page
        Given I navigate to the "<page>" page
        When I click the navbar "Home button"
        Then I should be redirected to the "Home" page
    Examples:
            | page    |
            | Product |
            | Cart    |
    
    # Cart button
    @header
    Scenario Outline: Navigate to Cart page with Cart button from "<page>" page
        Given I navigate to the "<page>" page
        When I click the navbar "Cart button"
        Then I should be redirected to the "Cart" page
    Examples:
            | page    | 
            | Home    | 
            | Product | 

    # Contact button
    @header
    Scenario Outline: Open Contact modal with Contact button from "page" page
        Given I navigate to the "page" page
        When I click the navbar "Contact button"
        Then I should see the "Contact" modal appears
    Examples:
            | page    |
            | Home    |
            | product |
            | Cart    |

    # Log in button
    @header
    Scenario Outline: Open the Log in modal from "page" page
        Given I navigate to the "page" page
        When I click the navbar "Log in button"
        Then I should see the "Log in" modal appears
    Examples:
            | page    |
            | Home    |
            | product |
            | Cart    |

    # Sign up button
    @header
    Scenario Outline: Open the Sign up modal from "page" page
        Given I navigate to the "page" page
        When I click the navbar "Sign up button"
        Then I should see the "Sign up" modal appears
    Examples:
            | page    |
            | Home    |
            | Product |
            | Cart    |
    
    # About us button
    Scenario Outline: Open the About us modal from "page" page
        Given I navigate to the "page" page
        When I click the navbar "About us button"
        Then I should see the "About us" modal appears
    Examples:
            | page    |
            | Home    |
            | Product |
            | Cart    |