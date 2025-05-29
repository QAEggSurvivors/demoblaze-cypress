# # BORRAR ESTE TEXTO ES SOLO CON CARACTER INFORMATIVO
# # UNA REFERENCIA ESTA EN LA PAGINA example.feature
# # para escribir los casos de prueba en gherkin
# # siempre en ingles lo más simple posible

# # EL FEATURE refiere al objeto o funcionalidad probada
# Feature: Product Carousel

# # TAGS se usan para replicar agrupar pruebas segun
# # los requerimientos pueden ser por ejemplo
# # @carousel @smoke @regression 
# # lelvan un @ delante y pueden ser tantas como la prueba 
# # contribuya a uno o varios agrupamientos las define el QA Lead 
# # sugiera y espere instrucciones respecto a ellas

# # EL ESCENARIO se usan para un vistazo general del caso, 
# # en algunos casos se considera colocar la US
# # puede ser una frase muy consisa que revele el objetivo de la prueba
#   Scenario: Display initial products

# # GIVEN se usan para dar el primer paso, 
# # generalmente ubicarse en el punto de partida
# # empiezan con el actor "yo navego a la pagina de inicio" (pero en ingles)
# # solo hay 1 no pueden haber varios 
#     Given I navigate to the home page

# # WHEN se usan para dar el paso siguiente,
# # en algunos grupos se usan repetidamente,
# # nosotros hemos decido usar 1 solo o ninguno 
# # (este ultimo caso es muy raro no se acostumbra)
# # y luego cada paso es con AND
#     When I give an example
#     And I give other example

# # THEN se usan para dar la validación de la prueba,
# # según lo esperado, no se recomienda colocar más de dos
# # el segundo se coloca con AND
# # en el caso de cypress should por ejemplo

#     Then I should see a product in the carousel
#     And I should see other product in the carousel

# # Recuerden que si se coloca entre comillas es una variable
# # que se recibe como un string y luego se castea si es conveniente
# # y ese valor se envia a la función que use este caso en el steps.js  

# # se aconseja hacer al menos 2 o 3 casos de pruebas 
# # puede ser cualquier combinación: 
# # 1 escenario con 3 casos 
# # 3 escenarios con 1 caso cada uno
# # 2 escenarios con 1 escenario 1 caso y el otro con 2 casos

# Feature: Google Main Page

#   I want to open a search engine
  
#   Scenario: Opening a search engine page 
# #   otra opcion puede ser: 
# #   As a user, I want to search for "egg live" in the search engine to access it.
#     Given I open Google page
#     When I write in the search bar "egg live"
#     And I press enter on the keyboard
#     Then I see "Google" in the title
#     And I see "egg live" among the first 5 search results.

# # recuerda colocar el texto igual en los .js steps 
# # solo se pueden sustituir los "" por {string}
# # y se puede usar o no en la funcion step correspondiente

# # Si una linea es exacamente igual en dos escenarios 
# # por ejemplo el Given solo es necesaria escrbirla 
# # una vez en el .js  step correspondiente