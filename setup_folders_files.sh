#!/bin/bash

mkdir -p cypress/integration/feature_1 cypress/integration/feature_2
touch cypress/integration/feature_1/feature_1.js
touch cypress/integration/feature_2/feature_2.js

mkdir -p cypress/support/pagesObject
touch cypress/support/pagesObject/{CartPage.js,ContactWindow.js,HomePage.js,LoginWindow.js,ProductPage.js,PurchaseWindow.js,SignupWindow.js}

