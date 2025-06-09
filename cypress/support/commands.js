// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import {
    getModalName,
    saveCategoryProducts
} from "../support/utils";

/**
 * Types text into an input field slowly, simulating human typing.
 * Useful for fields that validate input during typing.
 * 
 * @param {string} selector - CSS or XPath selector of the input element.
 * @param {string} text - Text to be typed character by character.
 * @param {number} [delay=100] - Delay between each character in milliseconds (default: 100).
 * @example
 * cy.typeSlowly("#username", "admin", 150);
 * @example
 * cy.typeSlowly(".search-input", "Cypress");
 */
Cypress.Commands.add("typeSlowly", (selector, text, delay = 100) => {
    cy.get(selector).clear();

    [...text].forEach((char, index) => {
        cy.get(selector).type(char, {
            delay
        }).should("have.value", text.slice(0, index + 1));
    });
});

/**
 * Captures the text from a browser alert/popup window.
 * Must be called *before* the action that triggers the alert.
 * 
 * @param {function} callback - Function to handle the alert text (`str`).
 * @example
 * cy.getAlertMessage((alertText) => {
 *   expect(alertText).to.equal("Product added");
 * });
 * @remarks
 * Uses `cy.on("window:alert")` internally.
 */
Cypress.Commands.add("getAlertMessage", (callback) => {
    cy.on("window:alert", (str) => {
        callback(str);
    });
});

/**
 * Retrieves the title element of a specified modal after ensuring the modal is ready.
 * - Automatically waits for the modal to be fully visible/active before locating the title
 * - Constructs the title selector dynamically using the modal name
 * 
 * @param {"Contact" | "About us" | "Log in" | "Sign up"} modalName - Name of the modal to target
 * @returns {Cypress.Chainable<JQuery<HTMLElement>>} Chainable Cypress object containing the modal title element
 * 
 * @example
 * Basic usage to get modal title
 * cy.getModalTitle("Contact").should("be.visible");
 * 
 * @example
 * Verify title text content
 * cy.getModalTitle("About us").should("contain", "About Us");
 * 
 * @see waitForModal - Command that ensures modal readiness
 * @see getModalName - Helper function that resolves modal identifiers
 * 
 * @remarks
 * - The title element is located using the pattern: #{modalName}ModalLabel
 * - This command is typically used for validation after modal opening
 */
Cypress.Commands.add("getModalTitle", (modalName) => {
    cy.waitForModal(modalName);
    return cy.get(`#${getModalName(modalName)}ModalLabel`);
});

/**
 * Waits for a Bootstrap modal to complete its show/hide transition.
 * Handles both modal visibility states and transition states.
 * 
 * @param {"Contact" | "About us" | "Log in" | "Sign up"} modalName - Name of the modal to wait for
 * @param {"show" | "hide"} [action="show"] - Whether to wait for show or hide completion
 * @returns {Cypress.Chainable<void>} Chainable command that resolves when transition completes
 * 
 * @example
 * Wait for modal to be fully shown (default)
 * cy.waitForModal("Contact");
 * 
 * @example
 * Explicitly wait for show completion
 * cy.waitForModal("Log in", "show");
 * 
 * @example
 * Wait for modal to be fully hidden
 * cy.waitForModal("Sign up", "hide");
 * 
 * @remarks
 * - Uses Bootstrap"s modal events (shown.bs.modal/hidden.bs.modal)
 * - Checks both CSS classes and transition states
 * - Default timeout of 10 seconds
 * - Requires jQuery ($) to be available in the application
 * - Dependent on getModalName() for selector resolution
 */
Cypress.Commands.add("waitForModal", (modalName, action = "show") => {
    return cy.window().then({
        timeout: 10000
    }, (win) => {
        return new Cypress.Promise((resolve) => {
            const $MODAL = win.$(`#${getModalName(modalName)}Modal`);

            if (action === "show") {
                if ($MODAL.hasClass("show") && !$MODAL.data("_isTransitioning")) {
                    resolve();
                } else {
                    $MODAL.on("shown.bs.modal", () => resolve());
                }
            } else {
                if (!$MODAL.hasClass("show")) {
                    resolve();
                } else {
                    $MODAL.on("hidden.bs.modal", () => resolve());
                }
            }
        });
    });
});

/**
 * Closes a Bootstrap modal by clicking either the footer button or header close icon,
 * then waits for the modal to fully hide.
 * 
 * @param {"Contact" | "AboutUs" | "Log in" | "Sign up"} modalName - Name of the modal to close
 * @param {"footer" | "header"} [position="footer"] - Position of the close control to click
 * @returns {Cypress.Chainable<void>} Chainable command that resolves when modal is fully hidden
 * 
 * @example
 * Close via footer button (default)
 * cy.closeModal("Contact");
 * 
 * @example
 * Close via header X icon
 * cy.closeModal("AboutUs", "header");
 * 
 * @example
 * Special case: AboutUs uses different footer button class
 * cy.closeModal("AboutUs"); // Uses .btn instead of .btn-secondary
 * 
 * @remarks
 * - Automatically waits for modal to complete hiding transition
 * - Uses different button classes based on modalName (AboutUs special case)
 * - Follows Bootstrap modal structure:
 *   Modal > ModalDialog > ModalContent > ModalFooter/Header
 * - Dependent on:
 *   - getModalData() for selector resolution
 *   - waitForModal() for transition completion
 */
Cypress.Commands.add("closeModal", (modalName, position = "footer") => {
    const clickAction = () => {
        if (position === "footer") {
            const BUTTON_CLASS = modalName === "AboutUs" ? ".btn" : ".btn-secondary";
            return cy.get(`#${getModalName(modalName)}Modal > .modal-dialog > .modal-content > .modal-footer > ${BUTTON_CLASS}`).click();
        } else {
            return cy.get(`#${getModalName(modalName)}Modal > .modal-dialog > .modal-content > .modal-header > .close > span`).click();
        }
    };

    return clickAction()
        .then(() => {
            return cy.waitForModal(modalName, "hide");
        });
});

/**
 * Clicks a random product image from the displayed list and stores its name as an alias.
 * - Selects a random product image from all visible products
 * - Extracts and stores the product name as "@selectedProductName" alias
 * - Performs a forced click on the selected image
 * 
 * @returns {Cypress.Chainable<void>} Chainable command that resolves after clicking
 * 
 * @example
 * Click a random product and use its name later
 * cy.clickProductByImageRandom();
 * cy.get("@selectedProductName").then(name => {
 *   cy.log(`Selected product: ${name}`);
 * });
 * 
 * @remarks
 * - Uses 10 second timeout for product cards to load
 * - Requires these locators to be defined:
 *   - cssCardsImage: Selector for product images
 *   - classCards: Selector for product card container
 *   - classCardsTitles: Selector for product title elements
 * - Performs force:true click to ensure action
 * - Random selection uses Lodash's _.random()
 */
Cypress.Commands.add("clickProductByImageRandom", () => {
    cy.get("#tbodyid .card img.card-img-top", {
            timeout: 10000
        })
        .should("exist")
        .and("have.length.gt", 0)
        .then($images => {
            const index = Cypress._.random(0, $images.length - 1);
            const $img = $images.eq(index);
            const productName = $img.closest(".card")
                .find(".card-title a")
                .text()
                .trim();

            cy.wrap(productName).as("selectedProductName");
            cy.wrap($img)
                .click({
                    force: true
                });
        });
});

/**
 * Clicks a random product title from the displayed list and stores product information.
 * - Selects a random product title from all visible products
 * - Stores all product names as "@productNames" alias
 * - Stores the selected product name as "@selectedProductName" alias
 * - Stores the selected element as "@prtChoice" alias
 * - Performs visibility checks before clicking
 * 
 * @returns {Cypress.Chainable<void>} Chainable command that resolves after clicking
 * 
 * @example
 * Click a random product title and use stored aliases
 * cy.clickProductByTitleRandom();
 * cy.get("@selectedProductName").then(name => {
 *   cy.log(`Selected product: ${name}`);
 * });
 * 
 * @example
 * Access all product names
 * cy.get("@productNames").then(names => {
 *   cy.log(`Total products: ${names.length}`);
 * });
 * 
 * @remarks
 * - Uses 10 second timeout for product titles to load
 * - Requires "cssCardsTitle" locator to be defined
 * - Performs multiple visibility/availability checks
 * - Uses force:true click to ensure action
 * - Random selection uses Lodash's _.random()
 * - Stores three different aliases for different use cases
 */
Cypress.Commands.add("clickProductByTitleRandom", () => {
    cy.get("#tbodyid .card .card-title a.hrefch", {
            timeout: 10000
        })
        .should("be.visible")
        .and("exist")
        .and("have.length.gt", 0)
        .then($links => {
            const PRODUCT_NAMES = [...$links].map(el => el.textContent.trim());
            const RANDOM_INDEX = Cypress._.random(0, $links.length - 1);
            const PRODUCT_NAME = $links[RANDOM_INDEX].textContent.trim();

            cy.wrap(PRODUCT_NAMES)
                .as("productNames");
            cy.wrap(PRODUCT_NAME)
                .as("selectedProductName");

            cy.get("#tbodyid .card .card-title a.hrefch")
                .eq(RANDOM_INDEX)
                .should("be.visible")
                .then($element => {
                    cy.wrap($element)
                        .as("prtChoice");

                    cy.wrap($element)
                        .should("exist")
                        .and("be.visible")
                        .click({
                            force: true
                        });
                });
        });
});

/**
 * Searches for and clicks a product by name across multiple pages using pagination.
 * - Performs a recursive search through product pages
 * - Clicks the product if found on current page
 * - Navigates to next page if product not found and more pages available
 * - Throws descriptive error if product not found after max pages
 * 
 * @param {string} productName - Exact name of the product to search for
 * @param {number} [maxPages=2] - Maximum number of pages to search (default: 2)
 * @returns {Cypress.Chainable<void>} Chainable command that resolves when product is clicked or search completes
 * 
 * @example
 * Search for product clicking through max 2 pages (default)
 * cy.clickProductByTitleWithNextButton("Samsung Galaxy S6");
 * 
 * @example
 * Search through up to 3 pages
 * cy.clickProductByTitleWithNextButton("MacBook Pro", 3);
 * 
 * @remarks
 * - Uses 10 second timeout for product titles to load
 * - Requires these locators:
 *   - cssCardsTitle: Selector for product title elements
 *   - cssNextButtonEnable: Selector for enabled next button
 *   - idNextButton: Selector for next page button
 * - Stores found product name as "@selectedProductName" alias
 * - Stores found product element as "@prtChoice" alias
 * - Includes 3 second wait between page transitions
 * - Provides detailed error message with available products if not found
 */
Cypress.Commands.add("clickProductByTitleWithNextButton", (productName, maxPages = 2) => {
    function searchProduct(page = 1) {
        cy.log(`Buscando "${productName}" en página ${page}`);

        cy.get("#tbodyid .card .card-title a.hrefch", {
                timeout: 10000
            })
            .should("exist")
            .and("be.visible")
            .and("have.length.gt", 0)
            .then(($links) => {
                const FOUND_LINK = [...$links].find(link =>
                    link.textContent.trim() === productName
                );

                if (FOUND_LINK) {
                    cy.wrap(FOUND_LINK.textContent.trim())
                        .as("selectedProductName");
                    cy.wrap(FOUND_LINK)
                        .as("prtChoice");
                    return cy.wrap(FOUND_LINK)
                        .click({
                            force: true
                        });
                } else if (page < maxPages && Cypress.$("#next2:not(:disabled)").length) {
                    cy.get("#next2")
                        .click();
                    cy.wait(3000);
                    return searchProduct(page + 1);
                } else {
                    const AVAILABLE_PRODUCTS = [...$links].map(link => link.textContent.trim());
                    throw new Error(`Producto "${productName}" no encontrado después de ${page} páginas. Productos disponibles: ${AVAILABLE_PRODUCTS.join(", ")}`);
                }
            });
    }
    searchProduct(1);
});

/**
 * Selects and adds multiple random products to cart across different categories.
 * - Randomly selects between min and max products from all available categories
 * - Clicks each product using clickProductByNameWithNextButton command
 * - Verifies successful addition with alert message
 * - Tracks all added products in Cypress.env
 * 
 * @param {number} [min=2] - Minimum number of products to add (default: 2)
 * @param {number} [max=15] - Maximum number of products to add (default: 15)
 * @returns {Cypress.Chainable<void>} Chainable command that resolves when all products are processed
 * 
 * @example
 * Add random 2-15 products (default)
 * cy.clickMultipleProductsByNameWithNextButton();
 * 
 * @example
 * Add exactly 5 random products
 * cy.clickMultipleProductsByNameWithNextButton(5, 5);
 * 
 * @example
 * Add 3-10 random products
 * cy.clickMultipleProductsByNameWithNextButton(3, 10);
 * 
 * @remarks
 * - Uses products from these environment arrays:
 *   - laptopsData
 *   - monitorsData
 *   - phonesData
 * - Stores these references:
 *   - qtyAdded: Number of products added (as alias)
 *   - selectedProductName: Array of product names (in Cypress.env)
 * - Requires these dependencies:
 *   - clickProductByNameWithNextButton command
 *   - getAlertMessage command
 *   - HomePage.goMainUrl() method
 * - Verifies each addition with "Product added" alert
 */
Cypress.Commands.add("clickMultipleProductsByNameWithNextButton", (min = 2, max = 15) => {
    const ALL_PRODUCTS = [
        ...Cypress.env("laptops"),
        ...Cypress.env("monitors"),
        ...Cypress.env("phones")
    ];

    const SELECTED = [];
    const QTY = Cypress._.random(min, max);
    const SELECTED_PRODUCTS = Cypress._.sampleSize(ALL_PRODUCTS, QTY);
    cy.wrap(QTY).as("qtyAdded");

    cy.wrap(SELECTED_PRODUCTS.length).as("qtyAdded");

    Cypress.env("selectedProductName", []);

    cy.wrap(SELECTED_PRODUCTS).each((product) => {
        const PRODUCT_NAME = product.name;

        cy.clickProductByTitleWithNextButton(PRODUCT_NAME);

        cy.getAlertMessage((msg) => {
            expect(msg).to.equal("Product added");
        });

        cy.contains("Add to cart").click();
        SELECTED.push(PRODUCT_NAME);

        Cypress.env("selectedProductName").push(PRODUCT_NAME);

        cy.HomePage.goMainUrl();

    }).then(() => {
        Cypress.env("selectedProductName", SELECTED);
    })
})

/**
 * Clicks on a specified category or selects a random valid category if the specified one is invalid.
 * 
 * @param {string} [categoryText] - Optional category name to click (phone, notebook, or monitor).
 * If not provided or invalid, selects a random valid category.
 * @returns {Cypress.Chainable<JQuery<HTMLElement>>} Chainable Cypress object containing the clicked element
 * 
 * @example
 * Click specified category
 * cy.clickRandomCategory("Phones");
 * 
 * @example
 * Click random category
 * cy.clickRandomCategory();
 * 
 * @example
 * Handle invalid category (returns random valid category without failing)
 * cy.clickRandomCategory("Phone"); // Logs warning and selects random valid category
 * 
 */
Cypress.Commands.add("clickRandomCategory", (categoryText) => {
    const VALID_CATEGORIES = ["Phones", "Laptops", "Monitors"];

    if (!VALID_CATEGORIES.includes(categoryText)) {
        const ORIGINAL_CATEGORY = categoryText;
        categoryText = Cypress._.sample(VALID_CATEGORIES);
        cy.log(`Category "${ORIGINAL_CATEGORY}" not found. Randomly selected: ${categoryText}`);
    }
    cy.CommandsUtilsPage.putAlias(categoryText, "selectedCategory");
    return cy.CommandsUtilsPage.clickCategoryName(categoryText);
});
////////////////////////////////////////////////////

