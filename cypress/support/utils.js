const LOCATORS = require("./locators");

/**
 * act with
 * @returns {string} The unique key identifier for the specified modal
 * 
 * @example
 * Basic usage to get modal key
 * const modalKey = getModalName("Contact"); // Returns "example"
 * 
 * @example
 * Usage in a test assertion
 * expect(getModalName("Log in")).to.equal("logIn");
 * 
 * @example
 * Practical usage with UI interaction
 * cy.get(`[data-test="${getModalName('Sign up')}Modal"]`).click();
 * 
 * @see data - Internal mapping object containing all modal identifiers
 */
export const getModalName = (nameModal) => {
  const data = {
    "Contact": "example",
    "About us": "video",
    "Log in": "logIn",
    "Sign up": "signIn"
  };
  return data[nameModal];
};

/**
 * Clicks on a category link based on the category name
 * @param {"Phones" | "Laptops" | "Monitors"} categoryName - Name of the category to click
 * @returns {Cypress.Chainable<JQuery<HTMLElement>>} Chainable Cypress object containing the clicked element
 * 
 * @example
 * Click on Phones category
 * clickCategoryName("Phones");
 * 
 * @example
 * Click on Laptops category
 * clickCategoryName("Laptops");
 */
export const clickCategoryName = (categoryName) => {
  const data = {
    "Phones": "phone",
    "Laptops": "notebook",
    "Monitors": "monitor"
  };
  return cy.get(`[onclick="byCat('${data[categoryName]}')"]`).click({
    force: true
  });
};

/**
 * Saves products from a specified category to a JSON file after ensuring the target file doesn't exist.
 * 
 * @async
 * @function saveCategoryProducts
 * @param {string} categoryName - The name of the product category to process (e.g., "Phones", "Laptops")
 * @returns {Promise<Object>} A promise that resolves to an object containing:
 * @property {string} filePath - The absolute path where the JSON file was saved
 * @property {Array<Object>} products - Array of product objects with their details
 * 
 * @property {string} products[].category - The category name of the product
 * @property {string} products[].name - The name/title of the product
 * @property {string} products[].price - The price of the product
 * @property {string} products[].description - The product description
 * 
 * @throws {Error} If unable to locate products or write to file
 * 
 * @example
 * Basic usage
 * saveCategoryProducts("Phones").then(({ filePath, products }) => {
 *   console.log(`Saved ${products.length} products to ${filePath}`);
 * });
 * 
 * @example
 * Using in a test assertion
 * cy.wrap(saveCategoryProducts("Laptops"))
 *   .its('products')
 *   .should('have.length.gt', 0);
 * 
 * @description
 * This function performs the following operations:
 * 1. Generates a file path based on the category name (lowercase) in cypress/fixtures/
 * 2. Deletes any existing file at that path using cy.task('deleteFileIfExists')
 * 3. Finds all product cards using the LOCATORS.cssCardsBody selector
 * 4. Extracts product details (name, price, description) from each card
 * 5. Writes the collected data to a JSON file
 * 6. Returns both the file path and product data
 * 
 * Note: Uses a 15-second timeout for locating product elements
 * 
 * @see LOCATORS - The locators object containing CSS selectors
 * @see cy.task - Cypress task used for file operations
 * @see cy.writeFile - Cypress file writing command
 */
export const saveCategoryProducts = (categoryName) => {
  const FILE_PATH = `cypress/fixtures/${categoryName.toLowerCase()}.json`;

  return cy.task('deleteFileIfExists', FILE_PATH).then(() => {
    return cy
      .get(LOCATORS.cssCardsBody, {
        timeout: 15000
      })
      .then(($cards) => {
        const PRODUCTS = [...$cards].map((card) => {
          const $CARD = Cypress.$(card);
          return {
            category: categoryName,
            name: $CARD.find(LOCATORS.cssTitleOncard).text().trim(),
            price: $CARD.find(LOCATORS.cssPriceOncard).text().trim(),
            description: $CARD.find(LOCATORS.classProductDescriptionOnCard).text().trim(),
          };
        });

        return cy.writeFile(FILE_PATH, PRODUCTS).then(() => {
          return {
            filePath: FILE_PATH,
            products: PRODUCTS
          };
        });
      });
  });
};