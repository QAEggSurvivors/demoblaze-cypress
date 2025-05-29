// se importa la pagina de la que se heredan todas atributos y metodos
// luego se extiende esa clase para que la herencia suceda:
import ProductPage from './ProductPage';
class ExamplePage extends ProductPage {
}
export default ExamplePage;

// los metodos se identifican la acción que hacen:
// si solo quiero traer un locator para luego usarlo
// se debe siempre traer el locator para luego usarlo a menos que tenga
// alguna condicion especial que haga que mejor que no
getLocator() = {return cy.get(pageLocatorCypress.env("pageLocators").NombreLocator).type(username)}

// por ejemplo hacer clic en el button login 
clickLoginButton() {return getLocator().click()}

// por ejemplo escribir en el campo username 
typeInputUsername(username) {return getLocator().type(username)}
// tip se puede colocar un valor por defecto tal que si la funcion se llama vacia
// toma ese valor para el caso
typeInputUsername(username = "Carlos") {return getLocator().type(username)}

// para usar los fixture pageLocators,expectedData,laptopsData,monitorsData,phonesData
// se usa la expresión en cualquier pagina en cualquier ambito
Cypress.env("fixture").nameVariable 

// Se usa estandar comillas dobles siempre primero y posteriormente a lo interno comillas simples según se requiera