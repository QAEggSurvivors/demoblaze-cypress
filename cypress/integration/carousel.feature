Feature: Carousel
    @carousel
    Scenario: Change current image on carousel with right arrow button
        Given I navigate to the home page
        When I click the "<side>" arrow button
        Then I should see that the current image on the carousel changes
    Example:
            | side  |
            | left  |
            | right |

    @carousel
    Scenario: Change current image on carousel with carousel first indicator
        Given I navigate to the home page
        When I click the carousel "<indicator>" indicator
        Then I should see that the current image alt on the carousel is "<alt>"
    Example:
            | indicator | alt          |
            | first     | First slide  |
            | second    | Second slide |
            | third     | Third slide  |