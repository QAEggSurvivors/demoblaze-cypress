Feature: Cards
    @cards
    Scenario: Successful go to Product Page
        Given I navigate to the home page
        When I click the "<product>" product "<link>"
        Then I should be redirected to url "<url>"
    Example:
            | product | link  | url                                    |
            | first   | name  | https://demoblaze.com/prod.html?idp_=1 |
            | second  | name  | https://demoblaze.com/prod.html?idp_=2 |
            | third   | name  | https://demoblaze.com/prod.html?idp_=3 |
            | first   | image | https://demoblaze.com/prod.html?idp_=1 |
            | second  | image | https://demoblaze.com/prod.html?idp_=2 |
            | third   | image | https://demoblaze.com/prod.html?idp_=3 |

Feature: Cards
    @cards
    Scenario: Successful go to Product Page
        Given I navigate to the home page
        When I see the "<product>"
        Then I should see that the "<section>" is "<info>"
    Example:
            | product | section     | info                                                                                                                                                                          |
            | first   | name        | Samsung galaxy s6                                                                                                                                                             |
            | first   | price       | $360                                                                                                                                                                          |
            | first   | description | The Samsung Galaxy S6 is powered by 1.5GHz octa-core Samsung Exynos 7420 processor and it comes with 3GB of RAM. The phone packs 32GB of internal storage cannot be expanded. |
            | second  | name        | Nokia lumia 1520                                                                                                                                                              |
            | second  | price       | $820                                                                                                                                                                          |
            | second  | description | The Nokia Lumia 1520 is powered by 2.2GHz quad-core Qualcomm Snapdragon 800 processor and it comes with 2GB of RAM.                                                           |
            | third   | name        | Nexus 6                                                                                                                                                                       |
            | third   | price       | $650                                                                                                                                                                          |
            | third   | description | The Motorola Google Nexus 6 is powered by 2.7GHz quad-core Qualcomm Snapdragon 805 processor and it comes with 3GB of RAM.                                                    |