Feature: Create product data files (names, price and description)

   EVERYTHING IS COMMENTED OUT BECAUSE THE SKIP OR IGNORE TAGS DON'T WORK.
  # Scenario Outline: AS A member of the QA team, I WANT to generate product information for the page according to the category SO THAT use in testing.
  #   Given I open the "https://www.demoblaze.com" website
  #   When I select "<the_category_name>" category
  #   Then A JSON file should be generated with "<quantity_items>" products in it
  #   Examples:
  #     | the_category_name | quantity_items |
  #     | Phones            | 7              |
  #     | Laptops           | 6              |
  #     | Monitors          | 2              |

  # Scenario Outline: Select the Laptops, Monitors or Phones category and a random product by the cards
  #   Given I open the "https://www.demoblaze.com" website
  #   When I select "<the_category_name>" category
  #   And I click on the image of the card of a random product
  #   Then I should be taken to the product page
  #   Examples:
  #     | the_category_name |
  #     | Phones            |
  #     | Laptops           |
  #     | Monitors          |

  # Scenario Outline: Select the random category and a random product by link
  #   Given I open the "https://www.demoblaze.com" website
  #   When I select "<a_random>" category
  #   And I click a random product by title
  #   Then I should be taken to the product page
  #   Examples:
  #     | a_random |
  #     | Phon    |

  # Scenario Outline: Select a product by name and use next button
  #   Given I open the "https://www.demoblaze.com" website
  #   When I search and click on "<product_one>"
  #   Then I should be taken to the product page

  #   Examples:
  #     | product_one |
  #     | Dell i7 8gb |

  # Scenario Outline: Select a category and a product by name
  #   Given I open the "https://www.demoblaze.com" website
  #   When I select "<the_category_name>" category
  #   And I search and click on "<product_two>"
  #   Then I should be taken to the product page

  #   Examples:
  #     | the_category_name | product_two       |
  #     | Phones            | Samsung galaxy s7 |

  # # Still under review, works but needs improvements.
  # Scenario: Select a category and multiple random products
  #   Given I open the "https://www.demoblaze.com" website
  #   When I add between "2" and "14" products randomly to the cart
  #   And I click on the cart button
  #   Then I should see the products in the car