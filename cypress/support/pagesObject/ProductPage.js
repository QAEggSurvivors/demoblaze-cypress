import HomePage from './HomePage';

const locators = Cypress.env("locators");

class ProductPage extends HomePage {

  getProductTitle = () => cy.get(locators.classProductTitle);
  getProductPrice = () => cy.get(locators.classProductPrice);
  getPorductDescription = () => cy.get(locators.idProductDescription);
  getProductImage = () => cy.get(locators.classProductImage);
  getAddToCartButton = () => cy.get(locators.classAddToCartButton);
  
  clickAddToCart(){
    this.getAddToCartButton().click();
  }
  getProductTitleText() {
    return this.getProductTitle().invoke("text");
  }
  getProductPriceText() {
    return this.getProductPrice().invoke("text");
  }
  getProductDescriptionText() {
    return this.getPorductDescription().invoke("text");
  }
  
  verifyProducttitle(expectedTitle) { 
    this.getProductTitle().should("contain.text", expectedTitle);
  }
  verifyProductPrice(expectedPrice) { 
    this.getProductPrice().should("contain.text", expectedPrice);
  }
  verifyProductImageIsVisible(){
    this.getProductImage().should("be.visible");
  }
  verifyAddToCartButtonIsVisible() {
    this.getAddToCartButton().should("be.visible")and("contain.text", "Add to cart");
  }
  
  handleAddToCartAlert() {
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Product added.");
    }).as("alert");
    cy.wait("@alert"); 
  }
}

export default ProductPage;
