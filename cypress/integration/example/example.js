// BORRAR ESTE TEXTO ES SOLO CON CARACTER INFORMATIVO
// UNA REFERENCIA ESTA EN LA PAGINA example/example.js

// simempre importar: 
import {
    Given,
    When,
    And,
    Then
} from "cypress-cucumber-preprocessor/steps";
// Los archivos steps para la ejecucion de las pruebas
// NO PUEDEN tener funciones nativas de cypress
// ESTO SIGNIFICA que las funciones nativas las manejan
// las pages objects. Esto es cy.get(), cy.contains() o similares
// Como vamos a crear commands estan tampoco pueden ser llamadas
// TAMPOCO PUEDEN SER LLAMADAS DIRECTAMENTE en los steps page

// Lo que generalmente si DEBE estar aca son los .SHOULD para 
// hacer las verificaciones solo en los THEN no pueden estar en otra
// parte si lo necesita encapsulelo en el pages object 

// SE DEBE USAR PRIMERO comillas simples (') y LUEGO comillas dobles (")
// SE PUEDE USAR CONTROLADORES JAVASCRIPT tipo IF/operador ternario/FOR/EACH
// pero no se recomienda, mejor usar dicha lógica en el page object


// en la page object example 
// goWebpage() {return cy.visit("/")}
Given('I open Google page', () => {
        cy.HomePage.goWebpage();
    }),
    // en la page object example 
    // typeSearchBar(search) {
    // return cy.get(Cypress.env('fixture').idSearchbar).typeSlowly(search)}
    When('I write in the search bar {string}', (search) => {
        cy.HomePage.typeSearchBarAnd(search);
    }),
    // en la page object example 
    // enterSearchBar() {
    // return cy.get(Cypress.env('fixture').idSearchbar).type({enter})}
    And('I press enter on the keyboard', () => {
        cy.HomePage.enterSearchBar();
    }),
    // en la page object example 
    // getTitle() {
    // return cy.get(Cypress.env('fixture').idTitleGoogleSearch)
    Then(`I see {string} in the title`, (title) => {
        cy.HomePage.getTitle().should('contain', title);
    }),
    // en la page object example 
    // getListSearchResult() {
    // return cy.get(Cypress.env('fixture').xpathListSearchResult)
    And('I see {string} among the first 5 search results', (search) => {
        cy.HomePage.getListSearchResult().should("contain", search);
    })

// recuerda que por nuestra configuración las page objects se instancian
// en el /support/index.js en un before each y se convierten en metodos
// nativos cypress por eso se usa: cy.PageObject para llamar a sus metodos
