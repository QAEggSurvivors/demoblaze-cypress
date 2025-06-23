Feature: Header
    # brand logo
    @header
    Scenario: Navigate to home with brand logo from "<page>" page
        Given I navigate to the "<page>" page
        When I click the navbar brand logo
        Then I should be redirected to the home page
    Example:
            | page    |
            | home    |
            | product |
            | cart    |

    # home button
    @header
    Scenario: Navigate to home with home button from "<page>" page
        Given I navigate to the "<page>" page
        When I click the navbar home button
        Then I should be redirected to the home page
    Example:
            | page    |
            | home    |
            | product |
            | cart    |

    # contact button
    @header
    Scenario: Open contact modal with contact button from "<page>" page
        Given I navigate to the "<page>" page
        When I click the navbar contact button
        Then I should see the contact modal appears
    Example:
            | page    |
            | home    |
            | product |
            | cart    |

    # cart button
    @header
    Scenario: Navigate to cart page with cart button from "<page>" page
        Given I navigate to the "<page>" page
        When I click the navbar cart button
        Then "<validation>"
    Example:
            | page    | validation                                 |
            | home    | I should be redirected to the cart page    |
            | product | I should be redirected to the cart page    |
            | cart    | I should see that the page does not change |

    # login button
    @header
    Scenario: Open the login modal from "<page>" page
        Given I navigate to the "<page>" page
        When I click the navbar login button
        Then I should see the login modal appears
    Example:
            | page    |
            | home    |
            | product |
            | cart    |

    # sign up button
    @header
    Scenario: Open the sign up modal from "<page>" page
        Given I navigate to the "<page>" page
        When I click the navbar sign button
        Then I should see the sign up modal appears
    Example:
            | page    |
            | home    |
            | product |
            | cart    |