Feature: Carousel
    @carousel
        Scenario: Change current image on carousel with right arrow button
            Given I navigate to the home page
            When I click the right arrow button
            Then I should see that the current image on the carousel changes

    @carousel
        Scenario: Change current image on carousel with left arrow button
            Given I navigate to the home page
            When I click the left arrow button
            Then I should see that the current image on the carousel changes
    
    @carousel
        Scenario: Change current image on carousel with carousel first indicator
            Given I navigate to the home page
            When I click the carousel first indicator
            Then I should see that the current image on the carousel changes to the first image

    @carousel
        Scenario: Change current image on carousel with carousel second indicator
            Given I navigate to the home page
            When I click the carousel second indicator
            Then I should see that the current image on the carousel changes to the second image
            
    @carousel
        Scenario: Change current image on carousel with carousel third indicator
            Given I navigate to the home page
            When I click the carousel third indicator
            Then I should see that the current image on the carousel changes to the third image