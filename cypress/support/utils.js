const LOCATORS = require("./locators");

/**
 * act with
 * @returns {string} The unique key identifier for the specified modal
 * 
 * @example
 * Basic usage to get modal key
 * const modalKey = GET_MODAL_NAME("Contact"); // Returns "example"
 * 
 * @example
 * Usage in a test assertion
 * expect(GET_MODAL_NAME("Log in")).to.equal("logIn");
 * 
 * @example
 * Practical usage with UI interaction
 * cy.get(`[data-test="${GET_MODAL_NAME('Sign up')}Modal"]`).click();
 * 
 * @see data - Internal mapping object containing all modal identifiers
 */
export const GET_MODAL_NAME = (nameModal) => {
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
 * CLICK_CATEGORY_NAME("Phones");
 * 
 * @example
 * Click on Laptops category
 * CLICK_CATEGORY_NAME("Laptops");
 */
export const CLICK_CATEGORY_NAME = (categoryName) => {
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
 * Saves products from a specified category to a JSON file after ensuring the TARGET file doesn't exist.
 * 
 * @async
 * @function SAVE_CATEGORY_PRODUCTS
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
 * SAVE_CATEGORY_PRODUCTS("Phones").then(({ filePath, products }) => {
 *   console.log(`Saved ${products.length} products to ${filePath}`);
 * });
 * 
 * @example
 * Using in a test assertion
 * cy.wrap(SAVE_CATEGORY_PRODUCTS("Laptops"))
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
export const SAVE_CATEGORY_PRODUCTS = (categoryName) => {
  const FILE_PATH = `cypress/fixtures/${categoryName.toLowerCase()}.json`;

  return cy.task('deleteFileIfExists', FILE_PATH).then(() => {
    return cy
      .get(LOCATORS.cardsBodyCss, {
        timeout: 15000
      })
      .then(($cards) => {
        const PRODUCTS = [...$cards].map((card) => {
          const $CARD = Cypress.$(card);
          return {
            category: categoryName,
            name: $CARD.find(LOCATORS.cardTitleClass).text().trim(),
            price: $CARD.find(LOCATORS.cardPriceCss).text().trim(),
            description: $CARD.find(LOCATORS.cardDescriptionClass).text().trim(),
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

/**
 * Adds a product to cart multiple times with quantity validation.
 * - Clicks product using title search
 * - Verifies successful addition via alert message
 * - Repeats for random quantity between min and max
 * - Validates each addition with visibility checks
 * 
 * @param {string} PRODUCT_NAME - Name of product to add repeatedly
 * @param {number} [min=1] - Minimum repetitions (default: 1)
 * @param {number} [max=1] - Maximum repetitions (default: 1)
 * @returns {number} Actual quantity of products added
 * 
 * @example
 * Add product once (default)
 * REPEAT_PRODUCTS("Samsung Galaxy S6");
 * 
 * @example
 * Add product 2-5 times
 * const addedQty = REPEAT_PRODUCTS("Nexus 6", 2, 5);
 * 
 * @remarks
 * - Requires these preconditions:
 *   - Product must be visible on current page
 *   - Alert message must be enabled
 * - Performs these validations:
 *   - Verifies "Product added" alert for each addition
 *   - Confirms add-to-cart button visibility before clicking
 * - Uses these components:
 *   - clickProductByTitleWithNextButton command
 *   - getAlertMessage command
 *   - LOCATORS.addToCartButtonSel selector
 * - Includes 1-second wait between additions
 * - Returns actual quantity added for tracking
 */
export const REPEAT_PRODUCTS = (PRODUCT_NAME, min = 1, max = 1) => {
  const QTY = Cypress._.random(min, max);
  cy.clickProductByTitleWithNextButton(PRODUCT_NAME);

  for (let i = 0; i < QTY; i++) {
    cy.getAlertMessage((msg) => {
      expect(msg).to.equal("Product added");
    });
    cy.get(LOCATORS.addToCartButtonSel)
      .should("be.visible")
      .click();
    cy.wait(1000);
  }
  return QTY;
};

/**
 * Recursively deletes products from cart based on specified strategy.
 * - Handles three deletion strategies with recursion
 * - Maintains real-time quantity tracking via Cypress aliases
 * - Ensures DOM stability with forced clicks and waits
 * - Preserves minimum cart items when required
 * 
 * @param {Object} config - Configuration object
 * @param {string} [config.strategy="all"] - Deletion strategy:
 *               - "all": Delete all products
 *               - "allName": Delete all matching name
 *               - "anyRandom": Delete random quantity
 * @param {number} config.initialQty - Initial cart quantity (for "all" strategy)
 * @param {string} [config.nameToDelete=null] - Product name to target (for "allName")
 * @param {number} [config.qtyToDelete=null] - Quantity to delete (for "anyRandom")
 * 
 * @example
 * Delete all products
 * DELETE_RECURSIVE({ strategy: "all", initialQty: 5 });
 * 
 * @example
 * Delete all "Samsung" products
 * DELETE_RECURSIVE({ strategy: "allName", nameToDelete: "Samsung Galaxy S6" });
 * 
 * @example
 * Delete 3 random products
 * DELETE_RECURSIVE({ strategy: "anyRandom", qtyToDelete: 3 });
 * 
 * @remarks
 * - Updates these Cypress aliases:
 *   - @qtyRemove: Tracks total removed items
 *   - @qtyAdded: Maintains current cart count
 * - Uses these dependencies:
 *   - getListProductsInCart command
 * - Safety mechanisms:
 *   - 700ms wait between deletions
 *   - Force click for reliability
 *   - Minimum 2 items preserved in "anyRandom"
 *   - Automatic termination when target not found
 * - Recursion handles DOM repaints after each deletion
 */
export const DELETE_RECURSIVE = ({strategy = "all",initialQty,nameToDelete = null,qtyToDelete = null}) => {
  const DELETE_AND_WAIT = (button) => {
    cy.wrap(button).click({
      force: true
    });
    cy.wait(700);
  };

  const HANDLE_ALL = (remaining, totalRemoved = 0) => {
    if (remaining === 0) {
      cy.wrap(totalRemoved).as('qtyRemove');
      return;
    }

    cy.getListProductsInCart().then(products => {
      if (products.length === 0) return;

      DELETE_AND_WAIT(products[0].deleteButton);
      const UPDATED_REMOVED = totalRemoved + 1;
      cy.wrap(UPDATED_REMOVED).as('qtyRemove');
      cy.wrap(initialQty - UPDATED_REMOVED).as('qtyAdded');
      HANDLE_ALL(remaining - 1, UPDATED_REMOVED);
    });
  };

  const HANDLE_BY_NAME = (totalRemoved = 0) => {
    cy.getListProductsInCart().then(products => {
      const TARGET = products.find(p => p.title === nameToDelete);
      if (!TARGET) {
        cy.wrap(totalRemoved).as('qtyRemove');
        return;
      }

      DELETE_AND_WAIT(TARGET.deleteButton);
      const UPDATED_REMOVED = totalRemoved + 1;
      cy.wrap(UPDATED_REMOVED).as('qtyRemove');
      cy.get('@qtyAdded').then(qty => {
        cy.wrap(qty - 1).as('qtyAdded');
      });
      HANDLE_BY_NAME(UPDATED_REMOVED);
    });
  };

  const HANDLE_RANDOM = (remaining, totalRemoved = 0) => {
    if (remaining === 0) {
      cy.wrap(totalRemoved).as('qtyRemove');
      return;
    }

    cy.getListProductsInCart().then(products => {
      if (products.length <= 2) {
        cy.log(`Se detiene eliminación: quedan ${products.length} productos (mínimo permitido)`);
        cy.wrap(totalRemoved).as('qtyRemove');
        return;
      }

      const RANDOM_PRODUCT = Cypress._.sample(products);
      if (!RANDOM_PRODUCT) {
        cy.wrap(totalRemoved).as('qtyRemove');
        return;
      }

      DELETE_AND_WAIT(RANDOM_PRODUCT.deleteButton);
      const UPDATED_REMOVED = totalRemoved + 1;

      cy.wrap(UPDATED_REMOVED).as('qtyRemove');
      cy.wrap(products.length - 1).as('qtyAdded');

      HANDLE_RANDOM(remaining - 1, UPDATED_REMOVED);
    });
  };

  switch (strategy) {
    case "all":
      HANDLE_ALL(initialQty);
      break;
    case "allName":
      HANDLE_BY_NAME();
      break;
    case "anyRandom":
      HANDLE_RANDOM(qtyToDelete);
      break;
  }
};

/**
 * Recursively removes specified products from cart with quantity tracking.
 * - Processes array of products sequentially
 * - Updates removal count and remaining quantity after each deletion
 * - Uses forced clicks for reliability
 * - Maintains real-time quantity aliases
 * 
 * @param {Array} productsToDelete - Array of product objects containing:
 *               - deleteButton: Element reference to click
 * @returns {void}
 * 
 * @example
 * Remove specific products
 * cy.getListProductsInCart().then(products => {
 *   const TO_DELETE = [products[0], products[2]];
 *   REMOVE_PRODUCTS(TO_DELETE);
 * });
 * 
 * @remarks
 * - Requires these preconditions:
 *   - @qtyAdded alias must be set
 *   - Products must exist in cart
 * - Manages these Cypress aliases:
 *   - @qtyRemove: Tracks count of deleted items
 *   - @qtyAdded: Maintains updated cart quantity
 * - Features:
 *   - Recursive processing for DOM stability
 *   - 700ms wait between deletions
 *   - Force click on delete buttons
 *   - Early exit if empty array provided
 * - Dependencies:
 *   - getListProductsInCart command (for typical usage)
 */
export const REMOVE_PRODUCTS = (productsToDelete) => {
  if (!productsToDelete.length) return;

  cy.get("@qtyAdded").then(initialQty => {
    let deleted = 0;

    const CLICK_NEXT = (index) => {
      if (index >= productsToDelete.length) {
        cy.wrap(deleted).as("qtyRemove");
        return;
      }

      cy.wrap(productsToDelete[index].deleteButton).click({
        force: true
      });
      cy.wait(700).then(() => {
        deleted++;
        cy.wrap(deleted).as("qtyRemove");
        cy.wrap(initialQty - deleted).as("qtyAdded");
        CLICK_NEXT(index + 1);
      });
    };

    CLICK_NEXT(0);
  });
};

/**
 * Ensures specified product exists in cart with multiple quantities.
 * - Verifies current product count in cart
 * - Adds additional quantities if needed
 * - Updates all quantity tracking references
 * - Maintains repeated product registry
 * 
 * @param {string} titleProduct - Title of product to ensure repetition
 * @throws {Error} If titleProduct is not provided
 * @returns {void}
 * 
 * @example
 * Ensure "Samsung Galaxy S6" appears at least twice
 * ENSURE_REPEATED("Samsung Galaxy S6");
 * 
 * @remarks
 * - Requires these preconditions:
 *   - Cart must be initialized
 *   - Product must exist in inventory
 * - Manages these references:
 *   - @qtyAdded: Updates total cart quantity
 *   - selectedProductName: Adds to Cypress.env array
 *   - selectedRepeatedProductName: Maintains in Cypress.env
 * - Features:
 *   - Minimum 2 copies enforced
 *   - Adds 2-5 additional copies if needed
 *   - Returns to homepage for product access
 *   - Comprehensive logging
 * - Dependencies:
 *   - getListProductsInCart command
 *   - REPEAT_PRODUCTS helper
 *   - LOCATORS.linkHomeCss selector
 * - Validation:
 *   - Throws error if title not specified
 *   - Skips if already sufficient copies exist
 */
export const ENSURE_REPEATED = (titleProduct) => {
  if (!titleProduct) throw new Error("Debe especificarse el título del producto");

  cy.getListProductsInCart().then(productsInCart => {
    const matches = productsInCart.filter(p => p.title === titleProduct);

    if (matches.length >= 2) {
      cy.log(`"${titleProduct}" ya está al menos 2 veces en el carrito. No se agrega más.`);
      return;
    }
    cy.get(LOCATORS.linkHomeCss).click();

    const qtyAdded = REPEAT_PRODUCTS(titleProduct, 2, 5);

    cy.get("@qtyAdded").then(currentQty => {
      const newQty = currentQty + qtyAdded;
      cy.wrap(newQty).as("qtyAdded");
    });

    const selected = Cypress.env("selectedProductName") || [];
    const updatedSelected = [...selected, ...Array(qtyAdded).fill(titleProduct)];
    Cypress.env("selectedProductName", updatedSelected);

    const repeated = Cypress.env("selectedRepeatedProductName") || [];
    const filtered = repeated.filter(p => p.name !== titleProduct);
    filtered.push({
      name: titleProduct,
      times: qtyAdded
    });
    Cypress.env("selectedRepeatedProductName", filtered);

    cy.log(`"${titleProduct}" agregado ${qtyAdded} veces y registrado como repetido`);
  });
};